import { Header } from "@/components/shared/header/header";
import { AuthClient } from "@/utils/auth.utils";

const members = [
  {
    name: "นายเอกวิชญ์ พิลาวรรณ",
    studentId: "663380619-8",
  },
  {
    name: "นายนพชาติ น้อยนารถ",
    studentId: "663380601-7",
  },
  {
    name: "นางสาวพัชริดา เฟื่องอารมย์",
    studentId: "663380608-3",
  },
];

export default async function HomePage() {
  const {} = await AuthClient.getInstance().getAuthenticatedUser();

  return (
    <div className="main-container">
      <Header
        title="Sofeware Design Project"
        description="โปรเจครายวิชา CP353002 Software Design and Development"
      />

      <h2 className="text-2xl font-bold">สมาชิก</h2>
      <ul>
        {members.map((member, index) => (
          <li key={index}>
            <p className="space-x-2 text-xl">
              <span>{index + 1}.</span>
              <span>{member.name}</span>
              <span>{member.studentId}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
