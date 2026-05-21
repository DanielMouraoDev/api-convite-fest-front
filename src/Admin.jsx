import { useEffect, useState } from 'react';

export default function Admin() { // Adicionei 'export' aqui diretamente
  const [convidados, setConvidados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/convidados`)
      .then(res => res.json())
      .then(data => {
        setConvidados(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar:", err);
        setLoading(false);
      });
  }, []);

  const deletar = async (id) => {
    if (window.confirm("Remover este convidado da lista?")) { // Use window.confirm para garantir compatibilidade
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/convidados/${id}`, { method: 'DELETE' });
        setConvidados(convidados.filter(c => c.id !== id));
      } catch (err) {
        alert("Erro ao excluir convidado.");
      }
    }
  };

  const confirmados = convidados.filter(c => c.statusPresenca === 'CONFIRMADO');
  const recusados = convidados.filter(c => c.statusPresenca === 'RECUSADO');

  if (loading) return <div className="p-10 text-white text-center">Carregando dados...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500 to-blue-600 p-6">
      <div className="max-w-md mx-auto bg-white/95 p-8 rounded-[2rem] shadow-2xl">
        <h1 className="text-3xl font-bold text-teal-800 mb-6 text-center">Painel do Moderador</h1>

        <div className="bg-teal-100 p-4 rounded-2xl mb-6 text-center">
          <p className="text-teal-800 font-bold text-lg">Total Confirmados: {confirmados.length}</p>
        </div>

        <h2 className="text-xl font-bold text-green-700 mb-4">Confirmados ({confirmados.length})</h2>
        <ul className="space-y-3 mb-8">
          {confirmados.map(c => (
            <li key={c.id} className="flex justify-between items-center bg-green-50 p-3 rounded-lg border border-green-200">
              <span className="font-medium">{c.nome}</span>
              <button onClick={() => deletar(c.id)} className="text-red-500 text-sm font-bold hover:underline">Excluir</button>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-bold text-red-700 mb-4">Recusados ({recusados.length})</h2>
        <ul className="space-y-3">
          {recusados.map(c => (
            <li key={c.id} className="flex justify-between items-center bg-red-50 p-3 rounded-lg border border-red-200">
              <span className="font-medium text-gray-600">{c.nome}</span>
              <button onClick={() => deletar(c.id)} className="text-red-500 text-sm font-bold hover:underline">Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}