import { Driver } from "../../../types";
import "./index.css";

export default function CardBodyDriver({ description, review, vehicle, value }: Driver) {
    return (
        <div className="body-container">
            <div className="header">
                <p><span>Veiculo: </span>{vehicle}</p>
            </div>
            <div className="main">
                <div className="description">
                    <h2>Descrição</h2>
                    {description}
                </div>
                <div className="comment">
                    <h2>Comentarios</h2>
                    {review.comment}
                </div>
            </div>
            <div className="footer">
                <div>
                    <h2>Nota:</h2>
                    {review.rating}
                </div>
                <p className="value">Valor: <span>{value}</span></p>
            </div>
        </div>
    )
}
