import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import React from "react"
import ReactDOM from "react-dom"

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            latitude: null,
            longitude: null,
            estacao: null,
            data: null,
            icone: null
        }
    }

    obterEstacao = (data,latitude) => {
        const anoAtual = data.getFullYear()
        //new Date(ano, mes (0 até 11), dia (1 até 31))
        //21/06
        const d1 = new Date(anoAtual,5,21)
        //24/09
        const d2 = new Date(anoAtual,8,24)
        //22/12
        const d3 = new Date(anoAtual,11,22)
        //21/03
        const d4 = new Date(anoAtual, 2, 21)

        if(data >= d1 && data < d2)
            // se latitude < 0 entao esta no hemisferio SUL
            return latitude < 0 ? "Inverno" : "Verão"
        if(data >= d2 && data < d3)
            return latitude < 0 ? "Primavera" : "Outono"
        if(data >= d3 || data < d4)
            return latitude < 0 ? "Verão" : "Inverno"
        return latitude < 0 ? "Outono" : "Primavera"    
    }

    icones = {
        "Primavera" : "fa-seedling",
        "Verão" : "fa-umbrella-beach",
        "Outono" : "fa-tree",
        "Inverno" : "fa-snowman"
    }

    obterLocalizacao = () =>{
        window.navigator.geolocation.getCurrentPosition(
            (posicao) => {
                let data = new Date()
                let estacao = this.obterEstacao(data,posicao.coords.latitude)
                let icone = this.icones[estacao]
                this.setState(
                    {
                        latitude: posicao.coords.latitude,
                        longitude: posicao.coords.longitude,
                        estacao: estacao,
                        data: data.toLocaleTimeString(),
                        icone: icone
                    }
                )
            }
        )
    }

    render(){
        return(<div>Meu app</div>)
    } 
}

ReactDOM.render(<App/>,document.querySelector("#root"))