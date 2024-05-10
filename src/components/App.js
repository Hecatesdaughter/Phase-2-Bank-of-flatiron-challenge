import React from "react";
import AccountContainer from "./AccountContainer";

function App() {
  return (
    <div className="ui raised segment">
      <div className="ui segment violet inverted">
        <h2>The Royal Bank of Muthama</h2>
      </div>
      <AccountContainer />
    </div>
  );
}

export default App;
