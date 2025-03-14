import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Download, Upload, RefreshCw } from "lucide-react";

const formSchema = z.object({
  autoBackupEnabled: z.boolean().default(true),
  backupFrequency: z.string().min(1, { message: "Frequency is required" }),
  backupTime: z.string().min(1, { message: "Time is required" }),
  retentionPeriod: z.coerce
    .number()
    .min(1, { message: "Must be at least 1" }),
  backupLocation: z.string().min(1, { message: "Location is required" }),
  dataToBackup: z.array(z.string()).default([]),
  notifyOnCompletion: z.boolean().default(true),
  notifyOnFailure: z.boolean().default(true),
});

type BackupSettingsFormProps = {
  settings?: z.infer<typeof formSchema>;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  onBackupNow?: () => void;
  onRestore?: (file: File) => void;
  isLoading?: boolean;
  lastBackupDate?: string;
  lastBackupSize?: string;
};

const BackupSettingsForm = ({
  settings = {
    autoBackupEnabled: true,
    backupFrequency: "daily",
    backupTime: "02:00",
    retentionPeriod: 30,
    backupLocation: "local",
    dataToBackup: [
      "inventory",
      "financials",
      "customers",
      "users",
      "settings",
    ],
    notifyOnCompletion: true,
    notifyOnFailure: true,
  },
  onSubmit = () => {},
  onBackupNow = () => {},
  onRestore = () => {},
  isLoading = false,
  lastBackupDate = "2023-06-15 02:00 AM",
  lastBackupSize = "245 MB",
}: BackupSettingsFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: settings,
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleRestoreClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onRestore(file);
    }
  };

  const dataItems = [
    { id: "inventory", label: "Inventory Data" },
    { id: "financials", label: "Financial Records" },
    { id: "customers", label: "Customer Information" },
    { id: "users", label: "User Accounts" },
    { id: "settings", label: "System Settings" },
    { id: "logs", label: "Activity Logs" },
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">Backup Settings</CardTitle>
            <CardDescription>
              Configure automatic backups and data retention
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onBackupNow}
              disabled={isLoading}
            >
              <Download className="h-4 w-4 mr-2" /> Backup Now
            </Button>
            <Button variant="outline" onClick={handleRestoreClick}>
              <Upload className="h-4 w-4 mr-2" /> Restore
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept=".zip,.sql,.json"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Last Backup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">{lastBackupDate}</div>
              <p className="text-sm text-muted-foreground">
                Size: {lastBackupSize}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Next Scheduled Backup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">
                {settings.autoBackupEnabled
                  ? new Date().toLocaleDateString() + " " + settings.backupTime
                  : "Not scheduled"}
              </div>
              <p className="text-sm text-muted-foreground">
                {settings.autoBackupEnabled
                  ? `${settings.backupFrequency} at ${settings.backupTime}`
                  : "Automatic backups are disabled"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Backup Schedule</h3>

              <FormField
                control={form.control}
                name="autoBackupEnabled"
                render={({ field }) =>