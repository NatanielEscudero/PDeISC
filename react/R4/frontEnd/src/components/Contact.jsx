export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Contacto</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Tu nombre" className="p-3 rounded-lg border"/>
          <input type="email" placeholder="Tu email" className="p-3 rounded-lg border"/>
          <textarea placeholder="Tu mensaje" rows="5" className="p-3 rounded-lg border"></textarea>
          <button className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}
