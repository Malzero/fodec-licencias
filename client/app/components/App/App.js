import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';


const App = ({ children }) => (
  <>



    <main>
      {children}
    </main>

    <Footer />
  </>
);

export default App;

