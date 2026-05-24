function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="patitas-footer mt-auto">
      <div className="container-fluid container-lg px-3 px-sm-4 py-3 py-md-4">
        <p className="patitas-footer__text text-center small mb-0">
          © {year} Patitas. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
