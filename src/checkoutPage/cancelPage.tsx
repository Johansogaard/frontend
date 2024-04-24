import { Helmet, HelmetProvider } from 'react-helmet-async';
export default function CancelPage() {
  return (
    <div>
      <HelmetProvider>
      <Helmet>
        <meta name="description" content="This is the cancel page" />
      </Helmet>
      </HelmetProvider>
      <h1>Payment cancelled!</h1>
    </div>
  )
}
