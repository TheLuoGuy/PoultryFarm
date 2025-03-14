import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/card";

const formSchema = z.object({
  sourceCoupId: z.string().min(1, { message: "Source coup is required" }),
  targetCoupId: z.string().min(1, { message: "Target coup is required" }),
  birdType: z.string().min(1, { message: "Bird type is required" }),
  quantity: z.coerce
    .number()
    .min(1, { message: "Quantity must be at least 1" }),
  reason: z.string().min(1, { message: "Reason is required" }),
  date: z.string().min(1, { message: "Date is required" }),
});

type AssignBirdsFormProps = {
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
};

const AssignBirdsForm = ({
  onSubmit = () => {},
  isLoading = false,
}: AssignBirdsFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceCoupId: "",
      targetCoupId: "",
      birdType: "",
      quantity: 0,
      reason: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Assign Birds to Coup
        </CardTitle>
        <CardDescription>
          Transfer birds between coups for better management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sourceCoupId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source Coup</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source coup" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="coup-a">Coup A</SelectItem>
                        <SelectItem value="coup-b">Coup B</SelectItem>
                        <SelectItem value="coup-c">Coup C</SelectItem>
                        <SelectItem value="coup-d">Coup D</SelectItem>
                        <SelectItem value="coup-e">Coup E</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetCoupId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Coup</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select target coup" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="coup-a">Coup A</SelectItem>
                        <SelectItem value="coup-b">Coup B</SelectItem>
                        <SelectItem value="coup-c">Coup C</SelectItem>
                        <SelectItem value="coup-d">Coup D</SelectItem>
                        <SelectItem value="coup-e">Coup E</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birdType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bird Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bird type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="layers">Layers</SelectItem>
                        <SelectItem value="broilers">Broilers</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Transfer</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="space-optimization">
                          Space Optimization
                        </SelectItem>
                        <SelectItem value="age-grouping">
                          Age Grouping
                        </SelectItem>
                        <SelectItem value="health-management">
                          Health Management
                        </SelectItem>
                        <SelectItem value="production-optimization">
                          Production Optimization
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transfer Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Transferring..." : "Transfer Birds"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AssignBirdsForm;
