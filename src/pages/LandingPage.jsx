import Header from '../components/Header'
import Hero from '../components/Hero'
import QuienSoy from '../components/QuienSoy'
import Servicios from '../components/Servicios'
import Certificaciones from '../components/Certificaciones'
import Curriculum from '../components/Curriculum'
import CasosExito from '../components/CasosExito'
import Contacto from '../components/Contacto'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'

function LandingPage() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <QuienSoy />
                <Servicios />
                <Certificaciones />
                <Curriculum />
                <CasosExito />
                <Contacto />
            </main>
            <Footer />
            <WhatsAppFloat />
        </>
    )
}

export default LandingPage
