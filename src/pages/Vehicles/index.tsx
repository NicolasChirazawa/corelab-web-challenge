import { useEffect, useState } from "react";

import { Button, Card, Search } from "../../components";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [search, setSearch] = useState<string>("");

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>

        <Button text="Add new vehicle" onClick={() => {}} />


          <p>Price: 22000</p>
          <p>Description: Carro usado por 2 anos...</p>

      </main>
    </div>
  );
};

export default VehiclesPage;
