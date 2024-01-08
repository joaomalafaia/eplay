import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'
import InputMask from 'react-input-mask'
import * as Yup from 'yup'

import Button from '../../components/Button'
import Card from '../../components/Card'

import barCode from '../../assets/images/barcode.png'
import creditCard from '../../assets/images/creditCard.png'

import { usePurchaseMutation } from '../../services/api'
import { RootReducer } from '../../store'
import { clear } from '../../store/reducers/cart'
import { getTotalPrice, parseToBrl } from '../../utils'

import * as S from './styles'

type Installment = {
  quantity: number
  amount: number
  formattedAmount: string
}

const Checkout = () => {
  const [withCard, setWithCard] = useState(false)
  const [purchase, { isLoading, isSuccess, data }] = usePurchaseMutation()

  const { items } = useSelector((state: RootReducer) => state.cart)
  const [installments, setInstallments] = useState<Installment[]>([])
  const dispatch = useDispatch()

  const totalPrice = getTotalPrice(items)

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
      installments: Yup.number().when((values, schema) =>
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
              month: Number(values.expiringMonth),
              year: Number(values.expiringYear)
            },
            code: Number(values.cardCode)
          },
          installments: values.installments
        },
        products: items.map((item) => ({
          id: item.id,
          price: item.prices.current as number
        }))
      })
    }
  })

  const choosePayment = () => {
    setWithCard(!withCard)
  }

  const checkInputHasError = (fieldName: string) => {
    const isTouched: boolean = fieldName in form.touched
    const isInvalid = fieldName in form.errors
    const hasError = isTouched && isInvalid

    return hasError
  }

  useEffect(() => {
    const calculateInstallments = () => {
      const installmentsArray: Installment[] = []
      for (let i = 1; i <= 6; i++) {
        installmentsArray.push({
          quantity: i,
          amount: totalPrice / i,
          formattedAmount: parseToBrl(totalPrice / i)
        })
      }

      return installmentsArray
    }

    if (totalPrice > 0) {
      setInstallments(calculateInstallments())
    }
  }, [totalPrice])

  useEffect(() => {
    if (isSuccess) {
      dispatch(clear())
    }
  }, [isSuccess, dispatch])

  if (items.length === 0 && isSuccess === false) {
    return <Navigate to="/" />
  }

  return (
    <div className="container">
      {isSuccess && data ? (
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
                    className={checkInputHasError('fullName') ? 'error' : ''}
                  />
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
                    className={checkInputHasError('mail') ? 'error' : ''}
                  />
                </S.InputGroup>
                <S.InputGroup>
                  <label htmlFor="cpf">CPF</label>
                  <InputMask
                    type="text"
                    id="cpf"
                    name="cpf"
                    value={form.values.cpf}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputHasError('cpf') ? 'error' : ''}
                    mask="999.999.999-99"
                  />
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
                    className={
                      checkInputHasError('deliveryEmail') ? 'error' : ''
                    }
                  />
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
                    className={
                      checkInputHasError('deliveryEmailConfirmation')
                        ? 'error'
                        : ''
                    }
                  />
                </S.InputGroup>
              </S.Row>
            </>
          </Card>
          <Card title="Pagamento">
            <div>
              {window.outerWidth > 768 ? (
                <div className="buttonContainer">
                  <S.TabButton
                    type="button"
                    onClick={choosePayment}
                    active={!withCard}
                  >
                    <img src={barCode} alt="Boleto" />
                    Boleto bancário
                  </S.TabButton>
                  <S.TabButton
                    type="button"
                    onClick={choosePayment}
                    active={withCard}
                  >
                    <img src={creditCard} alt="Cartão de Crédito" />
                    Cartão de crédito
                  </S.TabButton>
                </div>
              ) : (
                <div className="buttonContainer">
                  <S.TabButton
                    type="button"
                    onClick={choosePayment}
                    active={!withCard}
                  >
                    <img src={barCode} alt="Boleto" />
                  </S.TabButton>
                  <S.TabButton
                    type="button"
                    onClick={choosePayment}
                    active={withCard}
                  >
                    <img src={creditCard} alt="Cartão de Crédito" />
                  </S.TabButton>
                </div>
              )}
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
                        className={
                          checkInputHasError('cardOwner') ? 'error' : ''
                        }
                      />
                    </S.InputGroup>
                    <S.InputGroup>
                      <label htmlFor="cpfCardOwner">
                        CPF do titular do cartão
                      </label>
                      <InputMask
                        type="text"
                        id="cpfCardOwner"
                        name="cpfCardOwner"
                        value={form.values.cpfCardOwner}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={
                          checkInputHasError('cpfCardOwner') ? 'error' : ''
                        }
                        mask="999.999.999-99"
                      />
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
                        className={
                          checkInputHasError('cardName') ? 'error' : ''
                        }
                      />
                    </S.InputGroup>
                    <S.InputGroup>
                      <label htmlFor="cardNumber">Número do cartão</label>
                      <InputMask
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={form.values.cardNumber}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={
                          checkInputHasError('cardNumber') ? 'error' : ''
                        }
                        mask="9999 9999 9999 9999"
                      />
                    </S.InputGroup>
                    <S.InputGroup maxWidth="123px">
                      <label htmlFor="expiringMonth">Mês de vencimento</label>
                      <InputMask
                        type="text"
                        id="expiringMonth"
                        name="expiringMonth"
                        value={form.values.expiringMonth}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={
                          checkInputHasError('expiringMonth') ? 'error' : ''
                        }
                        max={12}
                        min={1}
                        mask="99"
                      />
                    </S.InputGroup>
                    <S.InputGroup maxWidth="123px">
                      <label htmlFor="expiringYear">Ano de vencimento</label>
                      <InputMask
                        type="text"
                        id="expiringYear"
                        name="expiringYear"
                        value={form.values.expiringYear}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={
                          checkInputHasError('expiringYear') ? 'error' : ''
                        }
                        min={24}
                        mask="99"
                      />
                    </S.InputGroup>
                    <S.InputGroup maxWidth="48px">
                      <label htmlFor="cardCode">CVV</label>
                      <InputMask
                        type="text"
                        id="cardCode"
                        name="cardCode"
                        value={form.values.cardCode}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={
                          checkInputHasError('cardCode') ? 'error' : ''
                        }
                        mask="999"
                      />
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
                        className={
                          checkInputHasError('installments') ? 'error' : ''
                        }
                      >
                        {installments.map((installment) => (
                          <option
                            key={installment.quantity}
                            value={installment.quantity}
                          >
                            {installment.quantity}x de{' '}
                            {installment.formattedAmount}
                          </option>
                        ))}
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
            disabled={isLoading}
          >
            {isLoading ? 'Finalizando compra...' : 'Finalizar compra'}
          </Button>
        </form>
      )}
    </div>
  )
}

export default Checkout
