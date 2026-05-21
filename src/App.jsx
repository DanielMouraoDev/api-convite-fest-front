import { useState } from 'react';
import './index.css';

export default function App() {
  const [nome, setNome] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarEndereco, setMostrarEndereco] = useState(false);

  const lidarComResposta = async (status) => {
    if (nome.trim() === '') {
      alert('Por favor, digite seu nome completo antes de responder!');
      return;
    }

    try {
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}/api/convidados`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome, statusPresenca: status })
      });

      if (resposta.ok) {
        alert(`Obrigado, ${nome}! Sua resposta (${status}) foi registrada.`);
        setNome('');
        setMostrarFormulario(false);
      } else {
        alert('Ops! Tivemos um problema. Tente novamente.');
      }
    } catch (erro) {
      alert('Erro de conexão! Verifique se o servidor está rodando.');
      console.error(erro);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E0E7EB] p-0">
      <div
        className="relative w-full max-w-md aspect-[3/4] bg-center bg-contain bg-no-repeat shadow-2xl"
        style={{ backgroundImage: "url('/background moana.jpeg')" }}
      >
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-10 z-50">
          <div className="col-span-2 row-span-8"></div>
          <div onClick={() => { setMostrarEndereco(true); setMostrarFormulario(false); }} className="row-span-2 col-span-1 cursor-pointer"></div>
          <div onClick={() => { setMostrarFormulario(true); setMostrarEndereco(false); }} className="row-span-2 col-span-1 cursor-pointer"></div>
        </div>
      </div>

      {mostrarEndereco && (
        <div className="absolute inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white/95 p-6 rounded-2xl shadow-2xl text-left max-w-sm w-full backdrop-blur-sm border border-white/40 relative">
            <button onClick={() => setMostrarEndereco(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl">&times;</button>
            <h1 className="text-2xl font-bold text-teal-700 mb-4 font-serif">Local da Aventura:</h1>
            <p className="text-gray-800 font-bold text-sm mb-2">Sweet Party Buffet Infantil</p>
            <p className="text-gray-700 text-sm mb-4 leading-relaxed">Av. Brás de Pina, 1879 - Vista Alegre, Rio de Janeiro - RJ, 21235-603</p>
            <button onClick={() => setMostrarEndereco(false)} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg">Entendi!</button>
          </div>
        </div>
      )}

      {mostrarFormulario && (
        <div className="absolute inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white/95 p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full backdrop-blur-sm border border-white/40 relative">
            <button onClick={() => setMostrarFormulario(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl">&times;</button>
            <h1 className="text-3xl font-bold text-teal-700 mb-2 font-serif">Vem com a gente!</h1>
            <input
              type="text" placeholder="Seu nome completo..." value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300"
            />
            <div className="flex flex-col gap-3">
              <button onClick={() => lidarComResposta('CONFIRMADO')} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg">Eu vou confirmar!</button>
              <button onClick={() => lidarComResposta('RECUSADO')} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg">Infelizmente não vou</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}