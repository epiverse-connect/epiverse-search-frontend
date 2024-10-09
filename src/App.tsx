import Grid from './Grid';

function App() {
  return (
    <div className="md:flex flex-col min-h-screen">
      <header className="grow-0 items-center text-center">
        <h1>Find your next epidemiology tools</h1>
      </header>
      <Grid first={<div>Column/Row 1</div>} second={<div>Column/Row 2</div>} />
    </div>
  );
}

export default App;
