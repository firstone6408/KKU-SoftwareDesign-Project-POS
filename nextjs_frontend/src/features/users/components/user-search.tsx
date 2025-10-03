"use client";

import { IUser } from "../schemas/user.schema";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { InputSearch } from "@/components/shared/search/input-search";

interface UserSearchProps {
  users: IUser[];
  setFilteredUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

export function UserSearch({ users, setFilteredUsers }: UserSearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => {
        const searchLower = debouncedSearchTerm.toLowerCase();
        return (
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
        );
      })
    );
  }, [debouncedSearchTerm, setFilteredUsers, users]);

  return (
    <InputSearch
      className="md:w-[40%]"
      setSearchTerm={setSearchTerm}
      placeholder="ค้นหาพนักงาน..."
    />
  );
}
