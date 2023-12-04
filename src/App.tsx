import { Redirect, Route, Switch } from "wouter";
import { QueryClientProvider } from "react-query";

import { CharactersListPage } from "@/pages/characters";
import { CharacterPage } from "@/pages/characters/:id";
import { NotFoundPage } from "./pages/404";

import { Header } from "@/features/header";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { queryClient } from "./api";

import "./App.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex flex-col w-full h-full">
          <Header />

          <Redirect to="/characters" />
          <Switch>
            <Route path="/characters" component={CharactersListPage} />
            <Route path="/characters/:id">
              {(params) =>
                params.id ? (
                  <CharacterPage id={parseInt(params.id)} />
                ) : (
                  <Redirect to="/404" />
                )
              }
            </Route>

            <Route path="/404" component={NotFoundPage} />
          </Switch>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
