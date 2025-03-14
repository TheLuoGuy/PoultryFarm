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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  mortalityRateThreshold: z.coerce
    .number()
    .min(0, { message: "Must be a positive number" })
    .max(100, { message: "Must be less than 100" }),
  feedStockThreshold: z.coerce
    .number()
    .min(0, { message: "Must be a positive number" }),
  temperatureMin: z.coerce.number(),
  temperatureMax: z.coerce.number(),
  eggProductionDropThreshold: z.coerce
    .number()
    .min(0, { message: "Must be a positive number" })
    .max(100, { message: "Must be less than 100" }),
  enableEmailAlerts: z.boolean().default(true),
  enableSmsAlerts: z.boolean().default(false),
  enablePushNotifications: z.boolean().default(true),
  alertRecipients: z.string(),
  alertTypes: z.array(z.string()).default([]),
});

type AlertSettingsFormProps = {
  settings?: z.infer<typeof formSchema>;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
};

const AlertSettingsForm = ({
  settings = {
    mortalityRateThreshold: 2,
    feedStockThreshold: 500,
    temperatureMin: 18,
    temperatureMax: 32,
    eggProductionDropThreshold: 10,
    enableEmailAlerts: true,
    enableSmsAlerts: false,
    enablePushNotifications: true,
    alertRecipients: "admin@poultryfarm.com, manager@poultryfarm.com",
    alertTypes: [
      "mortality-rate",
      "feed-stock",
      "temperature",
      "egg-production",
    ],
  },
  onSubmit = () => {},
  isLoading = false,
}: AlertSettingsFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: settings,
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  const alertTypeItems = [
    {
      id: "mortality-rate",
      label: "Mortality Rate Alerts",
      description: "Alert when mortality rate exceeds threshold",
    },
    {
      id: "feed-stock",
      label: "Feed Stock Alerts",
      description: "Alert when feed stock falls below threshold",
    },
    {
      id: "temperature",
      label: "Temperature Alerts",
      description: "Alert when temperature is outside the set range",
    },
    {
      id: "egg-production",
      label: "Egg Production Alerts",
      description: "Alert when egg production drops below threshold",
    },
    {
      id: "water-consumption",
      label: "Water Consumption Alerts",
      description: "Alert on abnormal water consumption patterns",
    },
    {
      id: "system",
      label: "System Alerts",
      description: "Alert on system issues or maintenance requirements",
    },
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Alert Settings</CardTitle>
        <CardDescription>
          Configure notification thresholds and alert preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Alert Thresholds</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="mortalityRateThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mortality Rate Threshold (%)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" {...field} />
                      </FormControl>
                      <FormDescription>
                        Alert when mortality rate exceeds this percentage
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="feedStockThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feed Stock Threshold (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" step="10" {...field} />
                      </FormControl>
                      <FormDescription>
                        Alert when feed stock falls below this amount
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="temperatureMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Temperature (°C)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Alert when temperature falls below this value
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="temperatureMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Temperature (°C)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Alert when temperature rises above this value
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eggProductionDropThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Egg Production Drop Threshold (%)</FormLabel>
                      <FormControl>
                        <Input type="number" step="1" {...field} />
                      </FormControl>
                      <FormDescription>
                        Alert when egg production drops by this percentage
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Methods</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="enableEmailAlerts"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Email Alerts
                        </FormLabel>
                        <FormDescription>
                          Receive alerts via email
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enableSmsAlerts"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">SMS Alerts</FormLabel>
                        <FormDescription>
                          Receive alerts via text message
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enablePushNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Push Notifications
                        </FormLabel>
                        <FormDescription>
                          Receive alerts in browser
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="alertRecipients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alert Recipients</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email addresses separated by commas"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Email addresses that will receive alert notifications
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Alert Types</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {alertTypeItems.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="alertTypes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>{item.label}</FormLabel>
                            <FormDescription>
                              {item.description}
                            </FormDescription>
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Alert Settings"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AlertSettingsForm;
