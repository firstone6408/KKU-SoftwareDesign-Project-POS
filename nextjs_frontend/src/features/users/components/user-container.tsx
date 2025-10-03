"use client";

import { Plus } from "lucide-react";
import { IUser } from "../schemas/user.schema";
import { CreateUserButton } from "./create-user-button";
import { UserListTable } from "./user-list-table";
import { useState } from "react";
import { UserSearch } from "./user-search";

interface UserContainerProps {
  users: IUser[];
}

export function UserContainer({ users }: UserContainerProps) {
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users);

  return (
    <>
      {/* Create user form */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <CreateUserButton>
          <Plus />
          <span>เพิ่มพนักงาน</span>
        </CreateUserButton>
        <UserSearch users={users} setFilteredUsers={setFilteredUsers} />
      </div>

      {/* Table */}
      <UserListTable
        card={{
          container: true,
          header: true,
          content: true,
        }}
        users={filteredUsers}
      />
    </>
  );
}
