import InfoSearchBar from '../searchbar/InfoSearchBar';
import Card from './card/Card';

function Info() {
  return (
    <main className="min-h-screen min-w-screen bg-neutral-900">
      <section className="hero bg-ghastly h-[50vh] bg-cover bg-center flex items-center justify-center">
        <div className="bg-neutral-950 bg-opacity-50 p-5 rounded-md flex flex-col items-center">
          <h1 className="text-5xl md:text-9xl text-neutral-50 tinyFont">
            GottaDex
          </h1>
          <h3 className="text-2xl md:text-4xl text-neutral-50 tinyFont">
            Your National Dex Companion
          </h3>
        </div>
      </section>
      <section className="info-text min-h-[50vh] w-auto flex items-center justify-center md:py-20 py-10">
        <Card
          title="A Useful Tool for Your Pokedex!"
          text="GottaDex is an alternative of using long and boring spreadsheets that are disorganized and can bog down your progress when completing the National Pokedex. GottaDex fixes this problem by giving you intuitive data for each Pokedex entry, such as forms, hidden abilities, gender differences, and more!"
        />
      </section>
      <InfoSearchBar />
    </main>
  );
}

export default Info;
