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
import { Textarea } from "@/components/ui/textarea";
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

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Coup name is required" }),
  type: z.string().min(1, { message: "Coup type is required" }),
  capacity: z.coerce
    .number()
    .min(1, { message: "Capacity must be at least 1" }),
  dimensions: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
});

type CoupManagementFormProps = {
  coup?: z.infer<typeof formSchema>;
  isEditing?: boolean;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
};

const CoupManagementForm = ({
  coup = {
    name: "",
    type: "",
    capacity: 0,
    dimensions: "",
    location: "",
    description: "",
  },
  isEditing = false,
  onSubmit = () => {},
  onDelete = () => {},
  isLoading = false,
}: CoupManagementFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: coup,
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    if (coup.id && confirm("Are you sure you want to delete this coup?")) {
      onDelete(coup.id);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {isEditing ? "Edit Coup" : "Add New Coup"}
        </CardTitle>
        <CardDescription>
          {isEditing
            ? "Update coup information and settings"
            : "Configure a new coup for your farm"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {coup.id && <input type="hidden" {...form.register("id")} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coup Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Coup A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coup Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select coup type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="layers">Layers</SelectItem>
                        <SelectItem value="broilers">Broilers</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                        <SelectItem value="breeding">Breeding</SelectItem>
                        <SelectItem value="quarantine">Quarantine</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity (birds)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dimensions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dimensions (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 10m x 15m" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Location (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. North section of the farm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional details about this coup"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? isEditing
                    ? "Saving..."
                    : "Creating..."
                  : isEditing
                    ? "Save Changes"
                    : "Create Coup"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      {isEditing && (
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete Coup
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CoupManagementForm;
