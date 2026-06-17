import { useState } from 'react';
import { Send, Users, Bell, FileText, LogOut, CheckCircle2 } from 'lucide-react';
import logo from "./logo.jpg";

const employees = [
  { id: 1, name: 'Аманжол', role: 'Инженер связи', online: true },
  { id: 2, name: 'Диспетчер', role: 'Helpdesk', online: true },
  { id: 3, name: 'Монтажная бригада', role: 'Выездные работы', online: false },
  { id: 4, name: 'Склад', role: 'Оборудование', online: true },
  { id: 5, name: 'Руководитель', role: 'Контроль задач', online: false }
];

const startMessages = [
  { id: 1, author: 'Диспетчер', text: 'Добро пожаловать в Compas Office.', time: '09:00', mine: false },
  { id: 2, author: 'Аманжол', text: 'Сегодня тестируем внутренний корпоративный чат.', time: '09:02', mine: true },
  { id: 3, author: 'Склад', text: 'Оборудование можно отмечать через будущий модуль заявок.', time: '09:05', mine: false }
];

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (name.trim() && password.trim()) onLogin(name.trim());
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={submit}>
        <img src={logo} alt="Compas Telecom" className="login-logo" />
        <h1>Compas Office</h1>
        <p>Внутреннее приложение для сотрудников Compas Telecom</p>
        <input placeholder="Логин" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Войти</button>
        <small>Для демо можно ввести любой логин и пароль</small>
      </form>
    </div>
  );
}

function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="brand">
        <img src={logo} alt="logo" />
        <div>
          <strong>Compas Office</strong>
          <span>Корпоративная рабочая среда</span>
        </div>
      </div>
      <div className="header-right">
        <span className="user-chip">{user}</span>
        <button className="ghost" onClick={onLogout}><LogOut size={18} /> Выйти</button>
      </div>
    </header>
  );
}

function EmployeeList() {
  return (
    <aside className="sidebar">
      <div className="sidebar-title"><Users size={18} /> Сотрудники</div>
      {employees.map((employee) => (
        <div className="employee" key={employee.id}>
          <div className="avatar">{employee.name[0]}</div>
          <div className="employee-info">
            <strong>{employee.name}</strong>
            <span>{employee.role}</span>
          </div>
          <i className={employee.online ? 'status online' : 'status offline'} />
        </div>
      ))}
    </aside>
  );
}

function DashboardCard({ icon, title, text }) {
  return (
    <div className="dashboard-card">
      {icon}
      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </div>
  );
}

function Chat({ user }) {
  const [messages, setMessages] = useState(startMessages);
  const [text, setText] = useState('');

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    setMessages([...messages, { id: Date.now(), author: user, text, time: now, mine: true }]);
    setText('');
  };

  return (
    <section className="chat">
      <div className="chat-head">
        <div>
          <h2>Общий корпоративный чат</h2>
          <p>Сообщения первой версии хранятся временно, только на экране.</p>
        </div>
        <span className="online-label">4 онлайн</span>
      </div>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={msg.mine ? 'message mine' : 'message'}>
            <div className="bubble">
              <b>{msg.author}</b>
              <p>{msg.text}</p>
              <small>{msg.time}</small>
            </div>
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={send}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Написать сообщение..." />
        <button><Send size={18} /></button>
      </form>
    </section>
  );
}

export default function App() {
  const [user, setUser] = useState('');

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="app">
      <Header user={user} onLogout={() => setUser('')} />
      <main className="layout">
        <EmployeeList />
        <div className="main-content">
          <div className="dashboard">
            <DashboardCard icon={<Bell />} title="Уведомления" text="Будущий модуль важных объявлений" />
            <DashboardCard icon={<FileText />} title="Документы" text="Инструкции, регламенты, служебки" />
            <DashboardCard icon={<CheckCircle2 />} title="Заявки" text="Будущий Helpdesk для задач" />
          </div>
          <Chat user={user} />
        </div>
      </main>
    </div>
  );
}
