import { clsx, type ClassValue } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { ServerMessage, ServerMessageStatus } from "@/utils/Messages";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isFile(value: any): value is File {
  return value instanceof File;
}

export function isString(value: any): value is string {
  return typeof value === "string";
}


export function encodedRedirect<T extends string>({
  type,
  path,
  params,
}: {
  type: T;
  path: string;
  params: { [key in T]: string } & Record<string, string>;
}): never {
  const queryParams = new URLSearchParams({
    [type]: params[type],
    ...params,
  }).toString();

  return redirect(`${path}?${queryParams}`);
}


export function toastToClient({ path, serverMessage, status }: { status: ServerMessage['status']; path: string; serverMessage: ServerMessage['msg']; },): never {

  return redirect(`${path}?serverMessage=${serverMessage}&status=${status}`);
}