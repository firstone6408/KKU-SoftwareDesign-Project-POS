import { BaseCardProps } from "@/interfaces/components/card";
import { IUser } from "../schemas/user.schema";
import { BaseCard } from "@/components/shared/card/base-card";
import { List } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserAction } from "./action/user-action";
import { TransaleEnumUtil } from "@/utils/translate-enum.utils";
import { dateTime } from "@/utils/dateTime.utils";

interface UserListTableProps extends BaseCardProps {
  users: IUser[];
}

export function UserListTable({ users, ...props }: UserListTableProps) {
  return (
    <BaseCard
      headerTitleIcon={List}
      headerTitle="รายการพนักงานทั้งหมด"
      {...props}
      content={
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-end">ลำดับ</TableHead>
              <TableHead>ชื่อ</TableHead>
              <TableHead>อีเมล์</TableHead>
              <TableHead className="text-center">ตำแหน่ง</TableHead>
              <TableHead className="text-center">
                เข้าสู่ระบบล่าสุด
              </TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="text-end">{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-center">
                  {TransaleEnumUtil.userRole(user.role)}
                </TableCell>
                <TableCell className="text-center">
                  {user.lastLoginAt
                    ? dateTime.formatDate(new Date(user.lastLoginAt))
                    : "ยังไม่ได้เข้าสู่ระบบ"}
                </TableCell>
                <TableCell>
                  <UserAction user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    />
  );
}
