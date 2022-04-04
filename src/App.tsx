import React from 'react';
import Header from './Header/Header';
import FirstSection from './Main/FirstSection/FirstSection';
import Register from './Main/Register/Register';
import Users from './Main/Users/Users';
import styles from "./styles.module.scss"

function App() {
  return (
    < >
      <Header />
      <main className={styles.main}>
        <FirstSection />
        <Users />
        <Register />
      </main>
    </>
  );
}

export default App;
