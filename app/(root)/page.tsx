import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import { TotalBalanceBox } from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn={firstName:"Diyara",lastName:"Rashid",email:"diyararashid@gmail.com"};
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstName || "Guest"} 
          subtext=" Access and manage your account and transactions efficiently."
            />
            <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1200.53}
            />
        </header>
        recent transactions
      </div>
      <RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance:120.20},{currentBalance:200.00}]}/>
    </section>
  );
};

export default Home;
