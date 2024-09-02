import { useState, FormEvent } from "react";
import logoImg from "./assets/logo.png";
import "./App.css";

interface InfoProps {
    title: string;
    alcool: number | string;
    gasolina: number | string;

}

function App() {
    
    const [alcoolInput, setAlcoolInput] = useState<number>(0);
    const [gasolinaInput, setGasolinaInput] = useState<number>(0);
    const [info, setInfo] = useState<InfoProps>();

    function calcular(event: FormEvent) {
        event.preventDefault();

        let media: number = alcoolInput / gasolinaInput;

        if(media <= 0.7) {
            setInfo({
                title: "Compensa usar Álcool",
                alcool: formatarMoeda(alcoolInput),
                gasolina: formatarMoeda(gasolinaInput)
            });
        } else {
            setInfo({
                title: "Compensa usar Gasolina",
                alcool: formatarMoeda(alcoolInput),
                gasolina: formatarMoeda(gasolinaInput)
            });
        }
    }

    function formatarMoeda(valor: number): string {
        let valorFormatado: string = valor.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
        })

        return valorFormatado;
    }

    return(
        <>
            <main className="container">
                <img className="logo" src={logoImg} alt="Logo da calculadora de combustivel"/>
                <h1 className="title">Qual a melhor opção?</h1>
                <form className="form" onSubmit={calcular}>
                    <label htmlFor="alcool">Álcool (preço por litro)</label>
                    <input
                        id="alcool"
                        className="input"
                        type="number"
                        placeholder="4,08"
                        min="1"
                        step="0.01"
                        required
                        value={alcoolInput}
                        onChange={(event) => setAlcoolInput(Number(event.target.value))}
                    />
                    <label htmlFor="gasolina">Gasolina (preço por litro)</label>
                    <input
                        id="gasolina"
                        className="input"
                        type="number"
                        placeholder="6,13"
                        min="1"
                        step="0.01"
                        required
                        value={gasolinaInput}
                        onChange={(event) => setGasolinaInput(Number(event.target.value))}
                    />
                    <input
                        type="submit"
                        value="Calcular"
                        className="button"
                    />
                </form>

                {info && (
                    <section className="result">
                        <h2 className="result-title">{info.title}</h2>
                        <span>Álcool {info.alcool}</span>
                        <span>Gasolina {info.gasolina}</span>
                    </section>
                )}
            </main>
        </>
    )
}

export default App;