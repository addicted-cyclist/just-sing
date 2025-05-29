import React from 'react';

const HomePage = () => {
  return (
    <div>
      <header>
        <div>App Name: Just Sing</div>
        <div>Burger Menu Icon</div>
        <div>Log in/Sign up Icon or User's Avatar</div>
      </header>
      <main>
        <section>
          <h2>Your recent songs:</h2>
          <ul>
            <li>Coldplay - Yellow</li>
            <li>Coldplay - Christmas lights</li>
            <li>Coldplay - Clocks</li>
          </ul>
        </section>
        <section>
          <h2>Popular songs:</h2>
          <ul>
            <li>Song 1</li>
            <li>Song 2</li>
            <li>Song 3</li>
          </ul>
        </section>
        <section>
          <input type="text" placeholder="Find your fav song:" />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
