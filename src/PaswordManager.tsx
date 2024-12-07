import { ChangeEvent, FormEvent, useState } from "react";
import PasswordsContent from "./Routes/PasswordsContent";

export type Manager<T> = {
  website: string;
  username: string;
  password?: T;
};

export default function PasswordManager() {
  const [formData, setFormData] = useState<Manager<string>>({
    website: "",
    username: "",
    password: "",
  });
  const [passwords, setPassword] = useState([
    { website: "Google.com", username: "Jane Appiah", password: "gdggdggdggd" },
  ]);

  function getFormData(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  }

  const addNewPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, website, password } = formData;
    const cpyPasswords = [...passwords];
    cpyPasswords.push({
      username: username,
      password: password,
      website: website,
    });
    setPassword(cpyPasswords);
  };

  return (
    <>
      <h1>Password Manager</h1>
      <h2>Password</h2>
      <div className="password_list">
        {passwords.map((item, index) => (
          <PasswordsContent key={index} data={item} />
        ))}
      </div>
      <form onSubmit={addNewPassword}>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={getFormData}
          placeholder="Your Website Name"
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={getFormData}
          placeholder="Your Username"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={getFormData}
          placeholder="Your Password"
        />
        <button>Add Password</button>
      </form>
    </>
  );
}
