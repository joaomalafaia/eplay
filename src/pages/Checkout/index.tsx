import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Button from '../../components/Button'
import Card from '../../components/Card'

import barCode from '../../assets/images/barcode.png'
import creditCard from '../../assets/images/creditCard.png'

import { usePurchaseMutation } from '../../services/api'

import * as S from './styles'

const Checkout = () => {
  const [withCard, setWithCard] = useState(false)
  const [purchase, { isSuccess, data }] = usePurchaseMutation()

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
      purchase({
        billing: {
          name: values.fullName,
          email: values.mail,
          document: values.cpf
        },
        delivery: {
          email: values.deliveryEmail
        },
        payment: {
          card: {
            active: withCard,
            owner: {
              name: values.cardOwner,
              document: values.cpfCardOwner
            },
            name: values.cardName,
            number: values.cardNumber,
            expires: {
              month: 3 /*Number(values.expiringMonth),*/,
              year: 2024 /*Number(values.expiringYear)*/
            },
            code: Number(values.cardCode)
          },
          installments: 1
        },
        products: [
          {
            id: 1,
            price: 10
          }
        ]
      })
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
    <div className="container">
      {isSuccess ? (
        <Card title="Muito obrigado">
          <>
            <p>
              É com satisfação que informamos que recebemos seu pedido com
              sucesso! <br />
              Abaixo estão os detalhes da sua compra: <br />
              Número do pedido: {data.orderId} <br />
              Forma de pagamento:{' '}
              {withCard ? 'Cartão de crédito' : 'Boleto bancário'}
            </p>
            <p className="margin-top">
              Caso tenha optado pelo pagamento via boleto bancário, lembre-se de
              que a confirmação pode levar até 3 dias úteis. Após a aprovação do
              pagamento, enviaremos um e-mail contendo o código de ativação do
              jogo.
            </p>
            <p className="margin-top">
              Se você optou pelo pagamento com cartão de crédito, a liberação do
              código de ativação ocorrerá após a aprovação da transação pela
              operadora do cartão. Você receberá o código no e-mail cadastrado
              em nossa loja.
            </p>
            <p className="margin-top">
              Pedimos que verifique sua caixa de entrada e a pasta de spam para
              garantir que receba nossa comunicação. Caso tenha alguma dúvida ou
              necessite de mais informações, por favor, entre em contato conosco
              através dos nossos canais de atendimento ao cliente.
            </p>
            <p className="margin-top">
              Agradecemos por escolher a EPLAY e esperamos que desfrute do seu
              jogo!
            </p>
          </>
        </Card>
      ) : (
        <form onSubmit={form.handleSubmit}>
          <Card title="Dados de Cobrança">
            <>
              <S.Row>
                <S.InputGroup>
                  <label htmlFor="fullName">Nome Completo</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={form.values.fullName}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>
                    {getErrorMessage('fullName', form.errors.fullName)}
                  </small>
                </S.InputGroup>
                <S.InputGroup>
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
                </S.InputGroup>
                <S.InputGroup>
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
                </S.InputGroup>
              </S.Row>
              <h3>Dados de entrega - conteúdo digital</h3>
              <S.Row>
                <S.InputGroup>
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
                    {getErrorMessage(
                      'deliveryEmail',
                      form.errors.deliveryEmail
                    )}
                  </small>
                </S.InputGroup>
                <S.InputGroup>
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
                </S.InputGroup>
              </S.Row>
            </>
          </Card>
          <Card title="Pagamento">
            <div>
              <div className="buttonContainer">
                <S.TabButton onClick={choosePayment} active={!withCard}>
                  <img src={barCode} alt="Boleto" />
                  Boleto bancário
                </S.TabButton>
                <S.TabButton onClick={choosePayment} active={withCard}>
                  <img src={creditCard} alt="Cartão de Crédito" />
                  Cartão de crédito
                </S.TabButton>
              </div>
              {withCard ? (
                <>
                  <S.Row>
                    <S.InputGroup>
                      <label htmlFor="cardOwner">
                        Nome do titular do cartão
                      </label>
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
                    </S.InputGroup>
                    <S.InputGroup>
                      <label htmlFor="cpfCardOwner">
                        CPF do titular do cartão
                      </label>
                      <input
                        type="text"
                        id="cpfCardOwner"
                        name="cpfCardOwner"
                        value={form.values.cpfCardOwner}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      <small>
                        {getErrorMessage(
                          'cpfCardOwner',
                          form.errors.cpfCardOwner
                        )}
                      </small>
                    </S.InputGroup>
                  </S.Row>
                  <S.Row marginTop="16px">
                    <S.InputGroup>
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
                    </S.InputGroup>
                    <S.InputGroup>
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
                    </S.InputGroup>
                    <S.InputGroup maxWidth="123px">
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
                    </S.InputGroup>
                    <S.InputGroup maxWidth="123px">
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
                        {getErrorMessage(
                          'expiringYear',
                          form.errors.expiringYear
                        )}
                      </small>
                    </S.InputGroup>
                    <S.InputGroup maxWidth="48px">
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
                    </S.InputGroup>
                  </S.Row>
                  <S.Row marginTop="16px">
                    <S.InputGroup maxWidth="150px">
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
                    </S.InputGroup>
                  </S.Row>
                </>
              ) : (
                <p>
                  Ao optar por essa forma de pagamento, é importante lembrar que
                  a confirmação pode levar até 3 dias úteis, devido aos prazos
                  estabelecidos pelas instituições financeiras. Portanto, a
                  liberação do código de ativação do jogo adquirido ocorrerá
                  somente após a aprovação do pagamento do boleto.
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
      )}
    </div>
  )
}

export default Checkout
