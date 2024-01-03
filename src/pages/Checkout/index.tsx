import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Button from '../../components/Button'
import Card from '../../components/Card'
import { InputGroup, Row, TabButton } from './styles'

import boleto from '../../assets/images/barcode.png'
import cartao from '../../assets/images/creditCard.png'

const Checkout = () => {
  const [withCard, setWithCard] = useState(false)
  const form = useFormik({
    initialValues: {
      fullName: '',
      mail: '',
      cpf: '',
      deliveryEmail: '',
      deliveryEmailConfirmation: '',
      cardOwner: '',
      cpfCardOwner: '',
      cardName: '',
      cardNumber: '',
      expiringMonth: '',
      expiringYear: '',
      cardCode: '',
      installments: 1
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, 'O nome precisa ter pelo menos 5 caracteres')
        .required('O campo é obrigatório'),
      mail: Yup.string()
        .email('E-mail inválido')
        .required('O campo é obrigatório'),
      cpf: Yup.string()
        .min(14, 'O campo precisa ter 14 caracteres')
        .max(14, 'O campo precisa ter 14 caracteres')
        .required('O campo é obrigatório'),
      deliveryEmail: Yup.string()
        .email('E-mail inválido')
        .required('O campo é obrigatório'),
      deliveryEmailConfirmation: Yup.string()
        .oneOf([Yup.ref('deliveryEmail')], 'Os e-mails são diferentes')
        .required('O campo é obrigatório'),

      cardOwner: Yup.string().when((values, schema) =>
        withCard ? schema.required('O campo é obrigatório') : schema
      ),
      cpfCardOwner: Yup.string().when((values, schema) =>
        withCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardName: Yup.string().when((values, schema) =>
        withCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardNumber: Yup.string().when((values, schema) =>
        withCard ? schema.required('O campo é obrigatório') : schema
      ),
      expiringMonth: Yup.string().when((values, schema) =>
        withCard ? schema.required('O campo é obrigatório') : schema
      ),
      expiringYear: Yup.string().when((values, schema) =>
        withCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardCode: Yup.string().when((values, schema) =>
        withCard ? schema.required('O campo é obrigatório') : schema
      ),
      installments: Yup.string().when((values, schema) =>
        withCard ? schema.required('O campo é obrigatório') : schema
      )
    }),
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const choosePayment = () => {
    setWithCard(!withCard)
  }

  const getErrorMessage = (fieldName: string, message?: string) => {
    const touched = fieldName in form.touched
    const erred = fieldName in form.errors

    if (touched && erred) return message

    return ''
  }

  return (
    <form onSubmit={form.handleSubmit} className="container">
      <Card title="Dados de Cobrança">
        <>
          <Row>
            <InputGroup>
              <label htmlFor="fullName">Nome Completo</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={form.values.fullName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>{getErrorMessage('fullName', form.errors.fullName)}</small>
            </InputGroup>
            <InputGroup>
              <label htmlFor="mail">E-mail</label>
              <input
                type="email"
                id="mail"
                name="mail"
                value={form.values.mail}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>{getErrorMessage('mail', form.errors.mail)}</small>
            </InputGroup>
            <InputGroup>
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={form.values.cpf}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>{getErrorMessage('cpf', form.errors.cpf)}</small>
            </InputGroup>
          </Row>
          <h3>Dados de entrega - conteúdo digital</h3>
          <Row>
            <InputGroup>
              <label htmlFor="deliveryEmail">E-mail</label>
              <input
                type="email"
                id="deliveryEmail"
                name="deliveryEmail"
                value={form.values.deliveryEmail}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>
                {getErrorMessage('deliveryEmail', form.errors.deliveryEmail)}
              </small>
            </InputGroup>
            <InputGroup>
              <label htmlFor="deliveryEmailConfirmation">
                Confirme o e-mail
              </label>
              <input
                type="email"
                id="deliveryEmailConfirmation"
                name="deliveryEmailConfirmation"
                value={form.values.deliveryEmailConfirmation}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>
                {getErrorMessage(
                  'deliveryEmailConfirmation',
                  form.errors.deliveryEmailConfirmation
                )}
              </small>
            </InputGroup>
          </Row>
        </>
      </Card>
      <Card title="Pagamento">
        <div>
          <div className="buttonContainer">
            <TabButton onClick={choosePayment} active={!withCard}>
              <img src={boleto} alt="Boleto" />
              Boleto bancário
            </TabButton>
            <TabButton onClick={choosePayment} active={withCard}>
              <img src={cartao} alt="Cartão de Crédito" />
              Cartão de crédito
            </TabButton>
          </div>
          {withCard ? (
            <>
              <Row>
                <InputGroup>
                  <label htmlFor="cardOwner">Nome do titular do cartão</label>
                  <input
                    type="text"
                    id="cardOwner"
                    name="cardOwner"
                    value={form.values.cardOwner}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>
                    {getErrorMessage('cardOwner', form.errors.cardOwner)}
                  </small>
                </InputGroup>
                <InputGroup>
                  <label htmlFor="cpfCardOwner">CPF do titular do cartão</label>
                  <input
                    type="text"
                    id="cpfCardOwner"
                    name="cpfCardOwner"
                    value={form.values.cpfCardOwner}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>
                    {getErrorMessage('cpfCardOwner', form.errors.cpfCardOwner)}
                  </small>
                </InputGroup>
              </Row>
              <Row marginTop="16px">
                <InputGroup>
                  <label htmlFor="cardName">Nome no cartão</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={form.values.cardName}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>
                    {getErrorMessage('cardName', form.errors.cardName)}
                  </small>
                </InputGroup>
                <InputGroup>
                  <label htmlFor="cardNumber">Número do cartão</label>
                  <input
                    type="number"
                    id="cardNumber"
                    name="cardNumber"
                    value={form.values.cardNumber}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>
                    {getErrorMessage('cardNumber', form.errors.cardNumber)}
                  </small>
                </InputGroup>
                <InputGroup maxWidth="123px">
                  <label htmlFor="expiringMonth">Mês de vencimento</label>
                  <input
                    type="number"
                    id="expiringMonth"
                    name="expiringMonth"
                    value={form.values.expiringMonth}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    max={12}
                    min={1}
                  />
                  <small>
                    {getErrorMessage(
                      'expiringMonth',
                      form.errors.expiringMonth
                    )}
                  </small>
                </InputGroup>
                <InputGroup maxWidth="123px">
                  <label htmlFor="expiringYear">Ano de vencimento</label>
                  <input
                    type="number"
                    id="expiringYear"
                    name="expiringYear"
                    value={form.values.expiringYear}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    min={2024}
                  />
                  <small>
                    {getErrorMessage('expiringYear', form.errors.expiringYear)}
                  </small>
                </InputGroup>
                <InputGroup maxWidth="48px">
                  <label htmlFor="cardCode">CVV</label>
                  <input
                    type="number"
                    id="cardCode"
                    name="cardCode"
                    value={form.values.cardCode}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>
                    {getErrorMessage('cardCode', form.errors.cardCode)}
                  </small>
                </InputGroup>
              </Row>
              <Row marginTop="16px">
                <InputGroup maxWidth="150px">
                  <label htmlFor="installments">Parcelamento</label>
                  <select
                    id="installments"
                    name="installments"
                    value={form.values.installments}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  >
                    <small>
                      {getErrorMessage(
                        'installments',
                        form.errors.installments
                      )}
                    </small>
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
      <Button
        type="submit"
        onClick={form.handleSubmit}
        title="Clique aqui para finalizar a compra"
      >
        Finalizar compra
      </Button>
    </form>
  )
}

export default Checkout
