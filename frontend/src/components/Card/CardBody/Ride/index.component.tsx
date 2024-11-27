import { Utils } from "../../../../Utils";
import { Ride } from "../../../types";
import "./style.css";

interface RideProps {
  ride: Ride;
}

export default function CardBodyRide({ ride }: RideProps) {
  const { date, distance, duration, value, driver } = ride;
  console.log(value)
  const splitedDate = String(date).split('T');
  const dataLocal = new Date(splitedDate[0]).toLocaleDateString('pt-BR');
  const time = splitedDate[1].split('.')[0];
  return (
    <section className="body-ride">
      <h3>Detalhes da Viagem</h3>
      <div className="details grid flex">
        <div className="date">
          <h4>Data:</h4>
          <p>{dataLocal}</p>
          <h4>Hora</h4>
          <p>{time}</p>
        </div>
        <div className="distance">
          <h4>Distância:</h4>
          <p>{Number(distance) / 1000} km</p>
        </div>
        <div className="time">
          <h4>Tempo:</h4>
          <p>{Utils.getDuration(duration)}</p>
        </div>
        <div className="value">
          <h4>Valor:</h4>
          <div>{value.toFixed(2)}</div>
        </div>
        <div className="driver column">
          <h4>Motorista:</h4>
          <p>{driver.name}</p>
          <div>
            <h4>Avaliar</h4>
            <p>★★★★★</p>
          </div>
        </div>
      </div>
    </section>
  )
}

