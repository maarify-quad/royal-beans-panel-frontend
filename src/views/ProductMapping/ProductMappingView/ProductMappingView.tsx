import { useEffect, useMemo, useState } from "react";

// Services
import {
  useGetShopifyProductsQuery,
  useGetRelationsQuery,
  useLazySearchParasutProductsQuery,
  useUpsertRelationMutation,
  useDeleteRelationMutation,
} from "@services/productMappingApi";
import type { ParasutProduct } from "@services/productMappingApi";

// Mantine
import {
  Accordion,
  Badge,
  Box,
  Button,
  Card,
  CloseButton,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";

// Icons
import {
  IconAlertCircle,
  IconCircleCheck,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconCheck,
} from "@tabler/icons";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Utils
import { groupVariants, getGroupMapping, VariantGroup } from "./grouping";

const useStyles = createStyles((theme) => ({
  groupRow: {
    display: "grid",
    gridTemplateColumns: "minmax(200px, 2fr) minmax(110px, 1fr) minmax(240px, 3fr) auto",
    gap: theme.spacing.md,
    alignItems: "center",
    padding: `${theme.spacing.sm}px 0`,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    "&:last-of-type": { borderBottom: "none" },
  },
  parasutItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.sm,
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    backgroundColor: "transparent",
    marginBottom: theme.spacing.xs,
  },
  parasutItemSelected: {
    borderColor: theme.colors.blue[6],
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.blue[9], 0.25)
        : theme.colors.blue[0],
  },
}));

type EditingState = {
  productTitle: string;
  groupTitle: string;
  variantIds: string[];
  selectedParasutIds: string[];
};

export const ProductMappingView = () => {
  const { classes, cx } = useStyles();

  // Queries
  const {
    data: products,
    isLoading: isLoadingProducts,
    isFetching: isFetchingProducts,
    error: productsError,
    refetch: refetchProducts,
  } = useGetShopifyProductsQuery();

  const {
    data: relationsData,
    isLoading: isLoadingRelations,
    isFetching: isFetchingRelations,
    refetch: refetchRelations,
  } = useGetRelationsQuery();

  // Lazy search for Paraşüt
  const [triggerParasutSearch, parasutSearchState] =
    useLazySearchParasutProductsQuery();

  // Mutations
  const [upsertRelation, upsertState] = useUpsertRelationMutation();
  const [deleteRelation, deleteState] = useDeleteRelationMutation();

  // Local state
  const [shopifySearch, setShopifySearch] = useState("");
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [parasutQuery, setParasutQuery] = useState("");
  const [debouncedParasutQuery] = useDebouncedValue(parasutQuery, 300);
  const [parasutCache, setParasutCache] = useState<Map<string, ParasutProduct>>(
    new Map()
  );

  // Build shopifyVariantId -> parasutIds[] map
  const relationsMap = useMemo(() => {
    const m = new Map<string, string[]>();
    if (!relationsData) return m;
    for (const r of relationsData) {
      const ids = r.parasutIds
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      m.set(r.shopifyId, ids);
    }
    return m;
  }, [relationsData]);

  // Seed placeholder names in cache for Paraşüt IDs we haven't searched yet
  useEffect(() => {
    if (!relationsData) return;
    setParasutCache((prev) => {
      const next = new Map(prev);
      for (const r of relationsData) {
        const ids = r.parasutIds
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        for (const id of ids) {
          if (!next.has(id)) {
            next.set(id, {
              id,
              name: `Paraşüt #${id}`,
              code: null,
              listPrice: null,
              vatRate: null,
            });
          }
        }
      }
      return next;
    });
  }, [relationsData]);

  // Trigger Paraşüt search when debounced query changes AND modal is open
  useEffect(() => {
    if (!editing) return;
    triggerParasutSearch({ q: debouncedParasutQuery || undefined })
      .unwrap()
      .then((result) => {
        setParasutCache((prev) => {
          const next = new Map(prev);
          for (const p of result.products) next.set(p.id, p);
          return next;
        });
      })
      .catch(() => {
        // Errors shown inline
      });
  }, [debouncedParasutQuery, editing, triggerParasutSearch]);

  // Filter products by Shopify search
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const q = shopifySearch.toLowerCase().trim();
    if (!q) return products;
    return products.filter((p) => {
      if (p.title.toLowerCase().includes(q)) return true;
      return p.variants.some(
        (v) =>
          (v.title || "").toLowerCase().includes(q) ||
          (v.sku || "").toLowerCase().includes(q)
      );
    });
  }, [products, shopifySearch]);

  // Stats — count by group, not by variant
  const { totalGroups, mappedGroups } = useMemo(() => {
    let total = 0;
    let mapped = 0;
    for (const p of products || []) {
      const groups = groupVariants(p);
      for (const g of groups) {
        total++;
        if (getGroupMapping(g, relationsMap).length > 0) mapped++;
      }
    }
    return { totalGroups: total, mappedGroups: mapped };
  }, [products, relationsMap]);

  const handleRefresh = async () => {
    await Promise.all([refetchProducts(), refetchRelations()]);
  };

  const openEditModal = (
    product: { title: string },
    group: VariantGroup,
    groupTitle: string
  ) => {
    const firstMappedId = group.variants.find((v) => relationsMap.has(v.id))?.id;
    const selected = firstMappedId ? [...(relationsMap.get(firstMappedId) ?? [])] : [];
    setEditing({
      productTitle: product.title,
      groupTitle,
      variantIds: group.variants.map((v) => v.id),
      selectedParasutIds: selected,
    });
    setParasutQuery("");
  };

  const closeModal = () => {
    setEditing(null);
    setParasutQuery("");
  };

  const toggleParasutSelection = (id: string) => {
    setEditing((prev) => {
      if (!prev) return prev;
      const idx = prev.selectedParasutIds.indexOf(id);
      const next =
        idx === -1
          ? [...prev.selectedParasutIds, id]
          : prev.selectedParasutIds.filter((x) => x !== id);
      return { ...prev, selectedParasutIds: next };
    });
  };

  // Save: applies the same mapping to ALL variants in the group in parallel
  const saveModal = async () => {
    if (!editing) return;
    const { variantIds, selectedParasutIds } = editing;
    try {
      if (selectedParasutIds.length === 0) {
        await Promise.all(
          variantIds.map((id) =>
            deleteRelation({ shopifyId: id }).unwrap()
          )
        );
      } else {
        await Promise.all(
          variantIds.map((id) =>
            upsertRelation({
              shopifyId: id,
              parasutIds: selectedParasutIds,
            }).unwrap()
          )
        );
      }
      showNotification({
        title: "Başarılı",
        message:
          variantIds.length > 1
            ? `${variantIds.length} varyanta kaydedildi`
            : "Eşleştirme kaydedildi",
        color: "green",
        icon: <IconCircleCheck />,
      });
      closeModal();
    } catch (err: any) {
      showNotification({
        title: "Kaydedilemedi",
        message: err?.data?.message || err?.message || "Beklenmedik bir hata",
        color: "red",
        icon: <IconAlertCircle />,
      });
    }
  };

  // Remove a single Paraşüt pill from a group (outside the modal)
  const removePill = async (variantIds: string[], parasutId: string) => {
    const current = relationsMap.get(variantIds[0]) || [];
    const updated = current.filter((x) => x !== parasutId);
    try {
      if (updated.length === 0) {
        await Promise.all(
          variantIds.map((id) => deleteRelation({ shopifyId: id }).unwrap())
        );
      } else {
        await Promise.all(
          variantIds.map((id) =>
            upsertRelation({ shopifyId: id, parasutIds: updated }).unwrap()
          )
        );
      }
      showNotification({
        title: "Başarılı",
        message: "Eşleştirme güncellendi",
        color: "green",
        icon: <IconCircleCheck />,
      });
    } catch (err: any) {
      showNotification({
        title: "Hata",
        message: err?.data?.message || err?.message || "Beklenmedik bir hata",
        color: "red",
        icon: <IconAlertCircle />,
      });
    }
  };

  const isSaving = upsertState.isLoading || deleteState.isLoading;
  const isBusy = isFetchingProducts || isFetchingRelations;

  return (
    <PageLayout
      title="Ürün Eşleştirme"
      tabTitle="Ürün Eşleştirme"
      breadcrumbs={[
        { label: "Panel", href: "/dashboard" },
        { label: "Ürün Eşleştirme", href: "/dashboard/product-mapping" },
      ]}
      isLoading={isLoadingProducts || isLoadingRelations}
      error={productsError}
      actions={
        <Button
          leftIcon={<IconRefresh size={16} />}
          onClick={handleRefresh}
          loading={isBusy}
          variant="light"
        >
          Yenile
        </Button>
      }
    >
      <Box mt="md" pos="relative">
        <LoadingOverlay visible={isBusy && !isLoadingProducts} />
        <Group position="apart" mb="md" align="center">
          <TextInput
            placeholder="Shopify ürün ara (ör. TAFT Kahve)…"
            icon={<IconSearch size={16} />}
            value={shopifySearch}
            onChange={(event) => setShopifySearch(event.currentTarget.value)}
            sx={{ flex: 1, maxWidth: 420 }}
          />
          <Text color="dimmed" size="sm">
            {mappedGroups} / {totalGroups} grup eşleşmiş
          </Text>
        </Group>

        {filteredProducts.length === 0 ? (
          <Card withBorder p="xl">
            <Text align="center" color="dimmed">
              Eşleşen ürün yok
            </Text>
          </Card>
        ) : (
          <Accordion multiple variant="separated" chevronPosition="left">
            {filteredProducts.map((product) => {
              const groups = groupVariants(product);
              const groupCount = groups.length;
              const variantCount = product.variants.length;
              const summary =
                groupCount === variantCount
                  ? `${variantCount} varyant`
                  : `${groupCount} grup · ${variantCount} varyant (öğütüm birleşik)`;
              return (
                <Accordion.Item key={product.id} value={product.id}>
                  <Accordion.Control>
                    <Group position="apart" pr="md">
                      <Group spacing="xs">
                        <Text weight={600}>{product.title}</Text>
                        <Text color="dimmed" size="xs">
                          ({summary})
                        </Text>
                      </Group>
                      <Text color="dimmed" size="xs">
                        {product.status}
                      </Text>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    {groups.map((group) => {
                      const mapping = getGroupMapping(group, relationsMap);
                      const groupTitle =
                        group.keepOptions.length > 0
                          ? group.keepOptions.join(" / ")
                          : "Tüm varyantlar";
                      const first = group.variants[0];
                      const ignoredNote =
                        group.ignoredValues.length > 0
                          ? `Öğütüm: ${
                              group.ignoredValues.length
                            } çeşit (${group.ignoredValues
                              .slice(0, 3)
                              .join(", ")}${
                              group.ignoredValues.length > 3 ? ", …" : ""
                            })`
                          : "";
                      const priceStr = first?.price ? `${first.price} TL` : "—";

                      return (
                        <Box key={group.key} className={classes.groupRow}>
                          <Box>
                            <Text weight={500}>{groupTitle}</Text>
                            <Text color="dimmed" size="xs">
                              {ignoredNote && `${ignoredNote} · `}
                              Fiyat: {priceStr}
                            </Text>
                          </Box>
                          <Text color="dimmed" size="xs">
                            {group.variants.length} varyant
                          </Text>
                          <Group spacing={6}>
                            {mapping.length === 0 ? (
                              <Badge color="orange" variant="light">
                                Eşleştirme yok
                              </Badge>
                            ) : (
                              mapping.map((pid) => {
                                const info =
                                  parasutCache.get(pid) ??
                                  ({
                                    id: pid,
                                    name: `Paraşüt #${pid}`,
                                  } as ParasutProduct);
                                return (
                                  <Badge
                                    key={pid}
                                    color="blue"
                                    variant="light"
                                    rightSection={
                                      <CloseButton
                                        size="xs"
                                        variant="transparent"
                                        onClick={() =>
                                          removePill(
                                            group.variants.map((v) => v.id),
                                            pid
                                          )
                                        }
                                        disabled={isSaving}
                                      />
                                    }
                                    sx={{ paddingRight: 3, textTransform: "none" }}
                                  >
                                    {info.name}
                                  </Badge>
                                );
                              })
                            )}
                          </Group>
                          <Button
                            size="xs"
                            variant="light"
                            onClick={() =>
                              openEditModal(product, group, groupTitle)
                            }
                          >
                            Eşleştir
                          </Button>
                        </Box>
                      );
                    })}
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })}
          </Accordion>
        )}
      </Box>

      <Modal
        opened={!!editing}
        onClose={closeModal}
        title={
          editing ? (
            <Box>
              <Text weight={600}>
                {editing.productTitle} — {editing.groupTitle || "Grup"}
              </Text>
              <Text color="dimmed" size="xs">
                {editing.variantIds.length > 1
                  ? `${editing.variantIds.length} varyanta birden uygulanacak`
                  : "1 varyant"}
              </Text>
            </Box>
          ) : null
        }
        size="lg"
      >
        {editing && (
          <Stack spacing="sm">
            <Box>
              <Text weight={500} size="sm" mb={6}>
                Seçili Paraşüt ürünleri:
              </Text>
              <Card withBorder p="sm" radius="sm">
                {editing.selectedParasutIds.length === 0 ? (
                  <Text color="dimmed" size="sm">
                    Henüz seçim yok
                  </Text>
                ) : (
                  <Group spacing={6}>
                    {editing.selectedParasutIds.map((id) => {
                      const info =
                        parasutCache.get(id) ??
                        ({
                          id,
                          name: `Paraşüt #${id}`,
                        } as ParasutProduct);
                      return (
                        <Badge
                          key={id}
                          color="blue"
                          variant="filled"
                          rightSection={
                            <CloseButton
                              size="xs"
                              variant="transparent"
                              onClick={() => toggleParasutSelection(id)}
                            />
                          }
                          sx={{ paddingRight: 3, textTransform: "none" }}
                        >
                          {info.name}
                        </Badge>
                      );
                    })}
                  </Group>
                )}
              </Card>
            </Box>

            <Divider />

            <Box>
              <Text weight={500} size="sm" mb={6}>
                Paraşüt'te ara:
              </Text>
              <TextInput
                placeholder="Paraşüt ürün adı…"
                icon={<IconSearch size={16} />}
                value={parasutQuery}
                onChange={(e) => setParasutQuery(e.currentTarget.value)}
                autoFocus
              />
            </Box>

            <ScrollArea style={{ height: 320 }} offsetScrollbars>
              <Box>
                {parasutSearchState.isFetching ? (
                  <Text color="dimmed" size="sm" p="sm">
                    Paraşüt'te aranıyor…
                  </Text>
                ) : parasutSearchState.isError ? (
                  <Text color="red" size="sm" p="sm">
                    Arama hatası:{" "}
                    {(parasutSearchState.error as any)?.data?.message ||
                      "Beklenmedik bir hata"}
                  </Text>
                ) : !parasutSearchState.data ||
                  parasutSearchState.data.products.length === 0 ? (
                  <Text color="dimmed" size="sm" p="sm">
                    {debouncedParasutQuery
                      ? "Sonuç yok"
                      : "Aramak için yukarıya yazın (boş bırakırsanız tüm ürünler gelir)"}
                  </Text>
                ) : (
                  parasutSearchState.data.products.map((p) => {
                    const isSelected =
                      editing.selectedParasutIds.includes(p.id);
                    const subParts: string[] = [];
                    if (p.code) subParts.push(`Kod: ${p.code}`);
                    if (p.listPrice != null) subParts.push(`${p.listPrice} TL`);
                    if (p.vatRate != null) subParts.push(`KDV %${p.vatRate}`);
                    return (
                      <UnstyledButton
                        key={p.id}
                        className={cx(classes.parasutItem, {
                          [classes.parasutItemSelected]: isSelected,
                        })}
                        onClick={() => toggleParasutSelection(p.id)}
                      >
                        <Box>
                          <Text weight={500} size="sm">
                            {p.name}
                          </Text>
                          {subParts.length > 0 && (
                            <Text color="dimmed" size="xs">
                              {subParts.join(" · ")}
                            </Text>
                          )}
                        </Box>
                        {isSelected ? (
                          <IconCheck size={18} />
                        ) : (
                          <IconPlus size={18} />
                        )}
                      </UnstyledButton>
                    );
                  })
                )}
              </Box>
            </ScrollArea>

            <Group position="right" mt="sm">
              <Button variant="default" onClick={closeModal} disabled={isSaving}>
                İptal
              </Button>
              <Button onClick={saveModal} loading={isSaving}>
                Kaydet
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </PageLayout>
  );
};
