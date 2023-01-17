/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

import { useEffect, useState } from 'react'

function App() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [estadoCivil, setEstadoCivil] = useState('')
    const [genero, setGenero] = useState('')
    const [progress, setProgress] = useState(0)

    const [pName, setPName] = useState(false)
    const [pEmail, setPEmail] = useState(false)

    const [disable, setDisable] = useState(true)

    useEffect(() => {
        if (progress === 100) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [progress])

    const verifyName = () => {
        const reg = /^[a-zA-Z]+ [a-zA-Z]+$/

        if (reg.test(name) && !pName) {
            setProgress(progress + 25)
            setPName(true)
        } else if (!reg.test(name) && pName) {
            setProgress(progress - 25)
            setPName(false)
        }
    }

    const verifyEmail = () => {
        const reg =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (reg.test(email) && !pEmail) {
            setProgress(progress + 25)
            setPEmail(true)
        } else if (!reg.test(email) && pEmail) {
            setProgress(progress - 25)
            setPEmail(false)
        }
    }

    const verifyEstadoCivil = event => {
        if (estadoCivil === '') {
            setProgress(progress + 25)
        }

        const { value } = event.target
        setEstadoCivil(value)

        if (value === '') {
            setProgress(progress - 25)
            setDisable(true)
        }
    }

    const verifyGenero = () => {
        if (genero === '') {
            setProgress(progress + 25)
        }
        if (progress == 100) {
            setDisable(false)
        }
    }

    const handleSubmit = () => {
        alert('Foi Caralho!!')
        setName('')
        setEmail('')
        setEstadoCivil('')
        setGenero('')
        setProgress(0)
        document.querySelector('.radio').checked = false
    }

    return (
        <div className="App">
            <h3>desafio fernandev</h3>
            <h1>progresso do formulário</h1>

            <main>
                {/* crie a barra de progresso aqui */}
                <div className="bar-container">
                    <div
                        className="bar"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="form-group">
                    <label htmlFor="">Nome Completo</label>
                    <input
                        value={name}
                        onChange={e => {
                            setName(e.target.value)
                            verifyName()
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">E-mail</label>
                    <input
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value)
                            verifyEmail()
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Estado Civil</label>
                    <select onChange={verifyEstadoCivil} value={estadoCivil}>
                        <option value="">- selecione...</option>
                        <option value="solteiro">Solteiro</option>
                        <option value="casado">Casado</option>
                        <option value="divorciado">Divorciado</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="">Gênero</label>
                    <div className="radios-container">
                        <span>
                            <input
                                className="radio"
                                type="radio"
                                name="genero"
                                value="Masculino"
                                onChange={e => {
                                    setGenero(e.target.value)
                                    verifyGenero()
                                }}
                            />
                            Masculino
                        </span>
                        <span>
                            <input
                                className="radio"
                                type="radio"
                                name="genero"
                                value="Feminino"
                                onChange={e => {
                                    setGenero(e.target.value)
                                    verifyGenero()
                                }}
                            />
                            Feminino
                        </span>
                    </div>
                </div>
                <button disabled={disable} onClick={handleSubmit}>
                    Enviar Formulário
                </button>
            </main>
        </div>
    )
}

export default App
