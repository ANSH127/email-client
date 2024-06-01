import { useRef, useState } from "react";

import { Editor } from "@tinymce/tinymce-react";
import { addDoc } from "firebase/firestore";
import { auth, mailRef } from "../config/firebase";
import Loadar from "../components/Loadar";

export default function Compose() {
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");

  const sendEmail = async () => {
    if (
      recipient === "" ||
      subject === "" ||
      editorRef.current.getContent() === ""
    ) {
      alert("Please fill all fields");
      return;
    }
    if(!auth.currentUser) {
      alert("Please login to send email");
      return;
    }
    if (auth?.currentUser?.email === recipient) {
      alert("You cannot send email to yourself");
      return;
    }
    const re = /\S+@\S+\.\S+/;
    if (!re.test(recipient)) {
      alert("Please enter a valid email address");
      return;
    }


    else {
      setLoading(true);
      try {
        await addDoc(mailRef, {
          recipient: recipient,
          subject: subject,
          message: editorRef.current.getContent(),
          createdAt: new Date().toISOString(),
          sender: auth.currentUser.email,
          trash:false,
          read:false,
        });
        alert("Email sent successfully");
        setRecipient("");
        setSubject("");
        editorRef.current.setContent("");
      } catch (error) {
        console.log(error);
        console.log("Error sending email");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="p-4 sm:ml-64">
      <div
        className="p-4 shadow-md border-gray-200  rounded-lg dark:border-gray-700 mt-14
      "
      >
        <input
          type="text"
          placeholder="Recipient"
          className="w-full p-2 border-2 border-gray-200  rounded-lg mt-4"
          onChange={(e) => setRecipient(e.target.value)}
          value={recipient}
        />

        <input
          type="text"
          placeholder="Subject"
          className="w-full p-2 border-2 border-gray-200  rounded-lg mt-4 mb-4"
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
        />

        <Editor
          apiKey="m1sh36xicx8qgl9k1qb1zo4kelro1eprcxxsxie8e9rncx1l"
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue=""
          init={{
            height: 300,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        {
        loading ? 
        <Loadar />
        :
          <button
          onClick={sendEmail}
          className="bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600 w-full"
        >
          Send Email
        </button>}
      </div>
    </div>
  );
}
