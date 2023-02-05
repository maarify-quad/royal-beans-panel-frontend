import React from "react";

// Routing
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./Routing";

// Providers
import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { Provider } from "react-redux";
import { ErrorProvider } from "@components/ErrorProvider";

// Config
import { AuthInitialiser } from "@components/AuthInitialiser";
import { useLocalStorage } from "@mantine/hooks";
import store from "./app/store";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "colorScheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            theme={{
              colorScheme,
              primaryColor: "indigo",
              fontFamily: "sans-serif",
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <NotificationsProvider position="top-right">
              <ModalsProvider>
                <ErrorProvider>
                  <AuthInitialiser>
                    <Routing />
                  </AuthInitialiser>
                </ErrorProvider>
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
