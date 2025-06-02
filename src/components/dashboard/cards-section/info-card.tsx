import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  isPending?: boolean;
};

export default function InfoCard({
  title,
  description,
  action,
  content,
  footer,
  isPending,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>{action}</CardAction>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <Skeleton className="h-[22px] w-[100px] rounded" />
        ) : (
          content
        )}
      </CardContent>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </Card>
  );
}
