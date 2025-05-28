import AppRouter from "../src/router/AppRouter";
import { FormProvider } from "./context/formContext";

export default function App() {
  return (
    <FormProvider>
      <AppRouter />
    </FormProvider>
  );
}
