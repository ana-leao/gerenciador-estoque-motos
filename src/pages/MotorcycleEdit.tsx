import { useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, X } from "lucide-react";
import { motorcyclesData, type Motorcycle } from "@/data/motorcycles";
import { useToast } from "@/hooks/use-toast";

const motorcycleSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome deve ter no máximo 100 caracteres"),
  brand: z.string().min(1, "Marca é obrigatória"),
  model: z.string().min(1, "Modelo é obrigatório"),
  year: z.number().min(1900, "Ano inválido").max(2030, "Ano inválido"),
  price: z.number().min(0, "Preço deve ser positivo"),
  stock: z.number().min(0, "Estoque deve ser positivo"),
  status: z.enum(["Disponível", "Vendido", "Reservado"]),
  category: z.enum(["Sport", "Naked", "Cruiser", "Adventure", "Scooter"]),
  engine: z.string().min(1, "Motor é obrigatório"),
  power: z.string().min(1, "Potência é obrigatória"),
  weight: z.string().min(1, "Peso é obrigatório"),
  fuel: z.string().min(1, "Combustível é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória").max(500, "Descrição deve ter no máximo 500 caracteres"),
  features: z.array(z.string()).min(1, "Pelo menos uma característica é obrigatória"),
});

type MotorcycleFormData = z.infer<typeof motorcycleSchema>;

const MotorcycleEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [featuresInput, setFeaturesInput] = useState("");

  const motorcycle = motorcyclesData.find(bike => bike.id === id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset
  } = useForm<MotorcycleFormData>({
    resolver: zodResolver(motorcycleSchema),
    defaultValues: motorcycle ? {
      name: motorcycle.name,
      brand: motorcycle.brand,
      model: motorcycle.model,
      year: motorcycle.year,
      price: motorcycle.price,
      stock: motorcycle.stock,
      status: motorcycle.status,
      category: motorcycle.category,
      engine: motorcycle.engine,
      power: motorcycle.power,
      weight: motorcycle.weight,
      fuel: motorcycle.fuel,
      description: motorcycle.description,
      features: motorcycle.features,
    } : undefined
  });

  if (!motorcycle) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-4">Moto não encontrada</h1>
          <Button asChild>
            <NavLink to="/motorcycles">Voltar ao catálogo</NavLink>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const onSubmit = async (data: MotorcycleFormData) => {
    try {
      // Simular salvamento (em um app real, aqui seria uma API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar dados localmente (em um app real, isso viria do backend)
      const motorcycleIndex = motorcyclesData.findIndex(bike => bike.id === id);
      if (motorcycleIndex !== -1) {
        motorcyclesData[motorcycleIndex] = {
          ...motorcyclesData[motorcycleIndex],
          ...data,
        };
      }

      toast({
        title: "Sucesso!",
        description: "Motocicleta atualizada com sucesso.",
      });

      navigate(`/motorcycles/${id}`);
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Erro ao atualizar motocicleta. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleAddFeature = () => {
    if (featuresInput.trim()) {
      const currentFeatures = watch("features") || [];
      setValue("features", [...currentFeatures, featuresInput.trim()]);
      setFeaturesInput("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    const currentFeatures = watch("features") || [];
    setValue("features", currentFeatures.filter((_, i) => i !== index));
  };

  const currentFeatures = watch("features") || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <NavLink to={`/motorcycles/${id}`}>
                <ArrowLeft className="h-4 w-4" />
              </NavLink>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Editar Motocicleta</h1>
              <p className="text-muted-foreground">
                {motorcycle.brand} {motorcycle.model} • {motorcycle.year}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Ex: Honda CBR 600RR"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Marca *</Label>
                    <Input
                      id="brand"
                      {...register("brand")}
                      placeholder="Ex: Honda"
                    />
                    {errors.brand && (
                      <p className="text-sm text-destructive">{errors.brand.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Modelo *</Label>
                    <Input
                      id="model"
                      {...register("model")}
                      placeholder="Ex: CBR 600RR"
                    />
                    {errors.model && (
                      <p className="text-sm text-destructive">{errors.model.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Ano *</Label>
                    <Input
                      id="year"
                      type="number"
                      {...register("year", { valueAsNumber: true })}
                      placeholder="Ex: 2024"
                    />
                    {errors.year && (
                      <p className="text-sm text-destructive">{errors.year.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select
                      value={watch("category")}
                      onValueChange={(value) => setValue("category", value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sport">Sport</SelectItem>
                        <SelectItem value="Naked">Naked</SelectItem>
                        <SelectItem value="Cruiser">Cruiser</SelectItem>
                        <SelectItem value="Adventure">Adventure</SelectItem>
                        <SelectItem value="Scooter">Scooter</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-destructive">{errors.category.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Descrição da motocicleta..."
                    rows={3}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Especificações Técnicas */}
            <Card>
              <CardHeader>
                <CardTitle>Especificações Técnicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="engine">Motor *</Label>
                    <Input
                      id="engine"
                      {...register("engine")}
                      placeholder="Ex: 599cc"
                    />
                    {errors.engine && (
                      <p className="text-sm text-destructive">{errors.engine.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="power">Potência *</Label>
                    <Input
                      id="power"
                      {...register("power")}
                      placeholder="Ex: 118 CV"
                    />
                    {errors.power && (
                      <p className="text-sm text-destructive">{errors.power.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso *</Label>
                    <Input
                      id="weight"
                      {...register("weight")}
                      placeholder="Ex: 194 kg"
                    />
                    {errors.weight && (
                      <p className="text-sm text-destructive">{errors.weight.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fuel">Combustível *</Label>
                    <Input
                      id="fuel"
                      {...register("fuel")}
                      placeholder="Ex: Gasolina"
                    />
                    {errors.fuel && (
                      <p className="text-sm text-destructive">{errors.fuel.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Características *</Label>
                  <div className="flex gap-2">
                    <Input
                      value={featuresInput}
                      onChange={(e) => setFeaturesInput(e.target.value)}
                      placeholder="Ex: ABS"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                    />
                    <Button type="button" onClick={handleAddFeature} variant="outline">
                      Adicionar
                    </Button>
                  </div>
                  {currentFeatures.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {currentFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
                          {feature}
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(index)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.features && (
                    <p className="text-sm text-destructive">{errors.features.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Preço e Estoque */}
            <Card>
              <CardHeader>
                <CardTitle>Preço e Estoque</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register("price", { valueAsNumber: true })}
                    placeholder="Ex: 45000"
                  />
                  {errors.price && (
                    <p className="text-sm text-destructive">{errors.price.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Estoque *</Label>
                  <Input
                    id="stock"
                    type="number"
                    {...register("stock", { valueAsNumber: true })}
                    placeholder="Ex: 8"
                  />
                  {errors.stock && (
                    <p className="text-sm text-destructive">{errors.stock.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={watch("status")}
                    onValueChange={(value) => setValue("status", value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Disponível">Disponível</SelectItem>
                      <SelectItem value="Reservado">Reservado</SelectItem>
                      <SelectItem value="Vendido">Vendido</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-sm text-destructive">{errors.status.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate(`/motorcycles/${id}`)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default MotorcycleEdit;