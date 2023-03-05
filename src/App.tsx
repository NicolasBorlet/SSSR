import "./App.css";
import Layout from "./shared/ui/layout/Layout";

function App() {
  return (
    <Layout
      children={
        <div className="App">
          <main className="bg-red-300 flex justify-between">
            <div className="bg-red-100 w-[20%]">
              <ul>
                <li>
                  <a href="/product">Produits</a>
                </li>
                <li>
                  <a href="/brand">Marques</a>
                </li>
                <li>Utilisateurs</li>
              </ul>
            </div>
            <div className="bg-red-200 w-[100%]">rigth</div>
          </main>
        </div>
      }
    />
  );
}

export default App;
