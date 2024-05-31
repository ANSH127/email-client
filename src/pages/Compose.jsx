
import { useRef } from 'react';

import { Editor } from '@tinymce/tinymce-react';

export default function Compose() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      
    }
  }
  return (
    
    <div className="p-4 sm:ml-64">
      <div className="p-4 shadow-md border-gray-200  rounded-lg dark:border-gray-700 mt-14
      ">

        <input 
        type="text"
        placeholder="Recipient"
        className="w-full p-2 border-2 border-gray-200  rounded-lg mt-4"
        />

        <input
        type="text"
        placeholder="Subject"
        className="w-full p-2 border-2 border-gray-200  rounded-lg mt-4 mb-4"
        />

        <Editor
        apiKey='m1sh36xicx8qgl9k1qb1zo4kelro1eprcxxsxie8e9rncx1l'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue=""
        init={{
          height: 300,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}
      className='bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600 w-full'
      >
        Send Email
      </button>
      </div>
    </div>
  )
}
