import React, { useState } from 'react';
import { FiSearch, FiGlobe, FiDownload, FiStar, FiFile, FiImage, FiVideo, FiMusic, FiGrid, FiList } from 'react-icons/fi';

function Test() {
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('en');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'name', 'popular'

  // Sample document data with i18n support
  const documents = {
    en: [
      { id: 1, name: 'Project Proposal.docx', type: 'doc', size: '2.4 MB', modified: '2023-05-15', owner: 'You', starred: true },
      { id: 2, name: 'Team Photo.jpg', type: 'image', size: '3.1 MB', modified: '2023-06-20', owner: 'Alex Chen', starred: false },
      { id: 3, name: 'Quarterly Report.pdf', type: 'pdf', size: '5.7 MB', modified: '2023-04-01', owner: 'You', starred: true },
      { id: 4, name: 'Product Demo.mp4', type: 'video', size: '45.2 MB', modified: '2023-03-12', owner: 'Maria Garcia', starred: false },
      { id: 5, name: 'Meeting Notes.docx', type: 'doc', size: '1.2 MB', modified: '2023-06-25', owner: 'You', starred: false },
    ],
    es: [
      { id: 1, name: 'Propuesta de Proyecto.docx', type: 'doc', size: '2.4 MB', modified: '2023-05-15', owner: 'Tú', starred: true },
      { id: 2, name: 'Foto del Equipo.jpg', type: 'image', size: '3.1 MB', modified: '2023-06-20', owner: 'Alex Chen', starred: false },
      // ... other Spanish documents
    ],
    fr: [
      { id: 1, name: 'Proposition de Projet.docx', type: 'doc', size: '2.4 MB', modified: '2023-05-15', owner: 'Vous', starred: true },
      { id: 2, name: 'Photo d\'Équipe.jpg', type: 'image', size: '3.1 MB', modified: '2023-06-20', owner: 'Alex Chen', starred: false },
      // ... other French documents
    ]
  };

  // Internationalization labels
  const i18n = {
    en: {
      searchPlaceholder: "Search in Drive...",
      noResults: "No files found",
      recent: "Recent",
      name: "Name",
      popular: "Popular",
      gridView: "Grid view",
      listView: "List view",
      modified: "Modified",
      owner: "Owner",
      fileTypes: {
        doc: "Document",
        pdf: "PDF",
        image: "Image",
        video: "Video",
        audio: "Audio"
      }
    },
    es: {
      searchPlaceholder: "Buscar en Drive...",
      noResults: "No se encontraron archivos",
      recent: "Reciente",
      name: "Nombre",
      popular: "Popular",
      gridView: "Vista de cuadrícula",
      listView: "Vista de lista",
      modified: "Modificado",
      owner: "Propietario",
      fileTypes: {
        doc: "Documento",
        pdf: "PDF",
        image: "Imagen",
        video: "Video",
        audio: "Audio"
      }
    },
    fr: {
      searchPlaceholder: "Rechercher dans Drive...",
      noResults: "Aucun fichier trouvé",
      recent: "Récent",
      name: "Nom",
      popular: "Populaire",
      gridView: "Vue en grille",
      listView: "Vue en liste",
      modified: "Modifié",
      owner: "Propriétaire",
      fileTypes: {
        doc: "Document",
        pdf: "PDF",
        image: "Image",
        video: "Vidéo",
        audio: "Audio"
      }
    }
  };

  // Filter and sort documents
  const filteredDocs = documents[language]
    .filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'popular') return b.starred - a.starred;
      return new Date(b.modified) - new Date(a.modified); // recent first
    });

  const getFileIcon = (type) => {
    switch(type) {
      case 'doc': return <FiFile className="text-blue-500" />;
      case 'pdf': return <FiFile className="text-red-500" />;
      case 'image': return <FiImage className="text-green-500" />;
      case 'video': return <FiVideo className="text-purple-500" />;
      case 'audio': return <FiMusic className="text-yellow-500" />;
      default: return <FiFile className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Language and View Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">GlobalDrive</h1>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="flex items-center space-x-2">
              <FiGlobe className="text-gray-500" />
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
            
            <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden">
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <FiGrid />
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={i18n[language].searchPlaceholder}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sort Controls */}
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          {['recent', 'name', 'popular'].map((sortOption) => (
            <button
              key={sortOption}
              onClick={() => setSortBy(sortOption)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                sortBy === sortOption 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {i18n[language][sortOption]}
            </button>
          ))}
        </div>

        {/* Documents Display */}
        {filteredDocs.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredDocs.map(doc => (
                <div key={doc.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-3 text-3xl">
                    {getFileIcon(doc.type)}
                    {doc.starred && <FiStar className="text-yellow-400 ml-1 text-sm" />}
                  </div>
                  <h3 className="font-medium text-gray-800 truncate text-center">{doc.name}</h3>
                  <p className="text-xs text-gray-500 text-center mt-1">{doc.size}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {i18n[language].name}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {i18n[language].owner}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {i18n[language].modified}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDocs.map(doc => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 text-lg mr-3">
                            {getFileIcon(doc.type)}
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {doc.name}
                            {doc.starred && <FiStar className="inline ml-2 text-yellow-400" size={14} />}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.owner}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(doc.modified).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.size}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <FiSearch size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">{i18n[language].noResults}</p>
            {searchTerm && (
              <p className="text-gray-400 mt-2">
                {language === 'en' && `No results for "${searchTerm}"`}
                {language === 'es' && `Sin resultados para "${searchTerm}"`}
                {language === 'fr' && `Aucun résultat pour "${searchTerm}"`}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Test;