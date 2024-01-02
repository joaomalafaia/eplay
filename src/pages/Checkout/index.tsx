import { useState } from 'react'
import Button from '../../components/Button'
import Card from '../../components/Card'
import { InputGroup, Row, TabButton } from './styles'

import boleto from '../../assets/images/barcode.png'
import cartao from '../../assets/images/creditCard.png'

const Checkout = () => {
  const [withCard, setWithCard] = useState(false)

  const choosePayment = () => {
    setWithCard(!withCard)
  }

  return (
    <div className="container">
      <Card title="Dados de Cobrança">
        <>
          <Row>
            <InputGroup>
              <label htmlFor="fullName">Nome Completo</label>
              <input type="text" id="fullName" />
            </InputGroup>
            <InputGroup>
              <label htmlFor="mail">E-mail</label>
              <input type="email" id="mail" />
            </InputGroup>
            <InputGroup>
              <label htmlFor="cpf">CPF</label>
              <input type="text" id="cpf" />
            </InputGroup>
          </Row>
          <h3>Dados de entrega - conteúdo digital</h3>
          <Row>
            <InputGroup>
              <label htmlFor="deliveryEmail">E-mail</label>
              <input type="email" id="deliveryEmail" />
            </InputGroup>
            <InputGroup>
              <label htmlFor="deliveryEmailConfirmation">
                Confirme o e-mail
              </label>
              <input type="email" id="deliveryEmailConfirmation" />
            </InputGroup>
          </Row>
        </>
      </Card>
      <Card title="Pagamento">
        <div>
          <div className="buttonContainer">
            <TabButton onClick={choosePayment} isActive={!withCard}>
              <img src={boleto} alt="Boleto" />
              Boleto bancário
            </TabButton>
            <TabButton onClick={choosePayment} isActive={withCard}>
              <img src={cartao} alt="Cartão de Crédito" />
              Cartão de crédito
            </TabButton>
          </div>
          {withCard ? (
            <>
              <Row>
                <InputGroup>
                  <label htmlFor="cardOwner">Nome do titular do cartão</label>
                  <input type="text" id="CardOwner" />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="cpfCardOwner">CPF do titular do cartão</label>
                  <input type="text" id="cpfCardOwner" />
                </InputGroup>
              </Row>
              <Row marginTop="16px">
                <InputGroup>
                  <label htmlFor="cardName">Nome no cartão</label>
                  <input type="text" id="cardName" />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="cardNumber">Número do cartão</label>
                  <input type="number" id="cardNumber" />
                </InputGroup>
                <InputGroup maxWidth="123px">
                  <label htmlFor="expiringMonth">Mês de vencimento</label>
                  <input type="number" id="expiringMonth" max={12} min={1} />
                </InputGroup>
                <InputGroup maxWidth="123px">
                  <label htmlFor="expiringYear">Ano de vencimento</label>
                  <input type="number" id="expiringYear" min={2024} />
                </InputGroup>
                <InputGroup maxWidth="48px">
                  <label htmlFor="cardCode">CVV</label>
                  <input type="number" id="cardCode" />
                </InputGroup>
              </Row>
              <Row marginTop="16px">
                <InputGroup maxWidth="150px">
                  <label htmlFor="installments">Parcelamento</label>
                  <select id="installments">
                    <option value="">1x de R$ 200,00</option>
                    <option value="">2x de R$ 100,00</option>
                    <option value="">4x de R$ 50,00</option>
                  </select>
                </InputGroup>
              </Row>
            </>
          ) : (
            <p>
              Ao optar por essa forma de pagamento, é importante lembrar que a
              confirmação pode levar até 3 dias úteis, devido aos prazos
              estabelecidos pelas instituições financeiras. Portanto, a
              liberação do código de ativação do jogo adquirido ocorrerá somente
              após a aprovação do pagamento do boleto.
            </p>
          )}
        </div>
      </Card>
      <Button type="button" title="Clique aqui para finalizar a compra">
        Finalizar compra
      </Button>
    </div>
  )
}

export default Checkout
