import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  calories: number;
  image: string;
  category: string;
  availability: {
    machine1: boolean;
    machine2: boolean;
    machine3: boolean;
  };
}

interface VendingMachine {
  id: number;
  address: string;
  floor: string;
  hours: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Цезарь',
    description: 'Классический салат с курицей, листьями салата и пармезаном',
    price: 320,
    calories: 380,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/9df29700-1e66-4bb6-aed1-61fdb273f981.jpg',
    category: 'Салаты',
    availability: { machine1: true, machine2: true, machine3: false }
  },
  {
    id: 2,
    name: 'Карбонара',
    description: 'Паста с беконом в сливочном соусе с пармезаном',
    price: 380,
    calories: 520,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/3d7db01a-bc0f-429a-bcd6-d022536ef25c.jpg',
    category: 'Основные блюда',
    availability: { machine1: true, machine2: true, machine3: true }
  },
  {
    id: 3,
    name: 'Блинчики',
    description: 'Тонкие домашние блинчики',
    price: 180,
    calories: 290,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/e08e1244-6a05-4a70-9ded-56e2ae754e8e.jpg',
    category: 'Завтраки',
    availability: { machine1: true, machine2: false, machine3: true }
  },
  {
    id: 4,
    name: 'Блинчики с мясом',
    description: 'Блинчики с мясной начинкой',
    price: 250,
    calories: 420,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/f8181805-811d-413b-9cc4-52284f8424d8.jpg',
    category: 'Завтраки',
    availability: { machine1: false, machine2: true, machine3: true }
  },
  {
    id: 5,
    name: 'Сырники',
    description: 'Творожные сырники со сметаной',
    price: 220,
    calories: 340,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/eed0b946-a168-4ad4-98b4-0502106047c3.jpg',
    category: 'Завтраки',
    availability: { machine1: true, machine2: true, machine3: false }
  },
  {
    id: 6,
    name: 'Винегрет',
    description: 'Классический овощной салат',
    price: 180,
    calories: 150,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/609d6129-629c-483b-a88f-2407355f9213.jpg',
    category: 'Салаты',
    availability: { machine1: true, machine2: true, machine3: true }
  },
  {
    id: 7,
    name: 'Плов с курицей',
    description: 'Ароматный плов с куриным мясом',
    price: 350,
    calories: 480,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/0e3f5a4e-c904-4e92-bef5-27e92e12f8a8.jpg',
    category: 'Основные блюда',
    availability: { machine1: true, machine2: false, machine3: true }
  },
  {
    id: 8,
    name: 'Куриные котлеты с булгуром',
    description: 'Сочные котлеты из курицы с гарниром из булгура',
    price: 320,
    calories: 410,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/2969e352-98bc-4a5f-8c98-478f15dfcc0d.jpg',
    category: 'Основные блюда',
    availability: { machine1: true, machine2: true, machine3: false }
  },
  {
    id: 9,
    name: 'Лапша гречневая с цукини и ореховым соусом',
    description: 'Полезная гречневая лапша с овощами',
    price: 340,
    calories: 380,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/ee3f6d9f-0aae-4659-9471-8a34f43989f9.jpg',
    category: 'Основные блюда',
    availability: { machine1: false, machine2: true, machine3: true }
  },
  {
    id: 10,
    name: 'Салат витаминный',
    description: 'Свежий салат из капусты и моркови',
    price: 150,
    calories: 120,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/0ff8b3b6-fc28-4514-a08f-3f64e7fc1a9b.jpg',
    category: 'Салаты',
    availability: { machine1: true, machine2: true, machine3: true }
  },
  {
    id: 11,
    name: 'Паста болоньезе',
    description: 'Паста с мясным соусом болоньезе',
    price: 360,
    calories: 500,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/991b2430-22ce-4d04-9abc-72dbe59fed46.jpg',
    category: 'Основные блюда',
    availability: { machine1: true, machine2: true, machine3: false }
  },
  {
    id: 12,
    name: 'Каша пшенная с тыквой',
    description: 'Полезная пшенная каша с тыквой',
    price: 200,
    calories: 280,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/48d18100-cb1c-45f5-987d-b0129c574423.jpg',
    category: 'Завтраки',
    availability: { machine1: true, machine2: false, machine3: true }
  },
  {
    id: 13,
    name: 'Вок с курицей',
    description: 'Лапша вок с курицей и овощами',
    price: 380,
    calories: 460,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/68ddde02-3d0b-4a97-928e-8ed19db1cf78.jpg',
    category: 'Основные блюда',
    availability: { machine1: false, machine2: true, machine3: true }
  },
  {
    id: 14,
    name: 'Биточки из курицы с капустой',
    description: 'Куриные биточки с тушеной капустой',
    price: 310,
    calories: 390,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/13d06a52-29d2-482d-b3ba-86ca17543f9c.jpg',
    category: 'Основные блюда',
    availability: { machine1: true, machine2: true, machine3: false }
  },
  {
    id: 15,
    name: 'Гречка с тефтелями в томатном соусе',
    description: 'Гречневая каша с тефтелями',
    price: 340,
    calories: 450,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/6b8f0bff-a8a9-4b07-ba27-000b40ec3e8c.jpg',
    category: 'Основные блюда',
    availability: { machine1: true, machine2: false, machine3: true }
  },
  {
    id: 16,
    name: 'Бургер с говядиной (сниженная калорийность)',
    description: 'Низкокалорийный бургер с говяжьей котлетой',
    price: 280,
    calories: 350,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/27b231dc-85e9-434c-a451-9fed62f6e8ab.jpg',
    category: 'Основные блюда',
    availability: { machine1: true, machine2: true, machine3: true }
  },
  {
    id: 17,
    name: 'Борщ',
    description: 'Традиционный борщ со сметаной',
    price: 250,
    calories: 220,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/5023e006-4507-44e5-8b90-0d1f8cf63120.jpg',
    category: 'Супы',
    availability: { machine1: false, machine2: true, machine3: true }
  },
  {
    id: 18,
    name: 'Ролл Калифорния',
    description: 'Ролл с крабовым мясом и авокадо',
    price: 320,
    calories: 280,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/27b231dc-85e9-434c-a451-9fed62f6e8ab.jpg',
    category: 'Суши',
    availability: { machine1: true, machine2: true, machine3: false }
  },
  {
    id: 19,
    name: 'Ролл Филадельфия',
    description: 'Ролл с лососем и сливочным сыром',
    price: 380,
    calories: 310,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/27b231dc-85e9-434c-a451-9fed62f6e8ab.jpg',
    category: 'Суши',
    availability: { machine1: true, machine2: false, machine3: true }
  },
  {
    id: 20,
    name: 'Ролл с угрем',
    description: 'Ролл с копченым угрем и огурцом',
    price: 350,
    calories: 290,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/27b231dc-85e9-434c-a451-9fed62f6e8ab.jpg',
    category: 'Суши',
    availability: { machine1: false, machine2: true, machine3: true }
  },
  {
    id: 21,
    name: 'Куриный суп с лапшой',
    description: 'Домашний куриный суп с яичной лапшой',
    price: 220,
    calories: 180,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/5023e006-4507-44e5-8b90-0d1f8cf63120.jpg',
    category: 'Супы',
    availability: { machine1: true, machine2: true, machine3: true }
  }
];

const vendingMachines: VendingMachine[] = [
  { id: 1, address: 'Островитянова 1с6', floor: '3 этаж', hours: '24/7' },
  { id: 2, address: 'Островитянова 1с7', floor: '2 этаж', hours: '24/7' },
  { id: 3, address: 'Островитянова 1с8', floor: '-2 этаж', hours: '24/7' }
];

const faqItems = [
  {
    question: 'Как заказать еду из автомата?',
    answer: 'Выберите блюдо на нашем сайте, проверьте наличие в нужном автомате. Вы также можете оформить дозаказ, и мы привезем блюдо на следующий день.'
  },
  {
    question: 'Еда свежая?',
    answer: 'Да! Мы готовим все блюда ежедневно на домашней кухне. Блюда хранятся при правильной температуре не более 24 часов.'
  },
  {
    question: 'Что такое дозаказ?',
    answer: 'Если нужного блюда нет в автомате, вы можете оформить дозаказ. Мы привезем его в выбранный автомат на следующий день.'
  },
  {
    question: 'Какие способы оплаты?',
    answer: 'Принимаем карты (Visa, Mastercard, МИР), Apple Pay, Google Pay, СБП. Оплата производится непосредственно у автомата.'
  }
];

function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'calories-asc' | 'calories-desc'>('price-asc');
  const [filterInStock, setFilterInStock] = useState(false);
  const [selectedMachineFilter, setSelectedMachineFilter] = useState<number | null>(null);
  const [preorderDialogOpen, setPreorderDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedMachineForPreorder, setSelectedMachineForPreorder] = useState<number | null>(null);

  const filteredAndSortedItems = useMemo(() => {
    let items = [...menuItems];

    if (filterInStock && selectedMachineFilter) {
      items = items.filter(item => {
        if (selectedMachineFilter === 1) return item.availability.machine1;
        if (selectedMachineFilter === 2) return item.availability.machine2;
        if (selectedMachineFilter === 3) return item.availability.machine3;
        return true;
      });
    }

    items.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'calories-asc':
          return a.calories - b.calories;
        case 'calories-desc':
          return b.calories - a.calories;
        default:
          return 0;
      }
    });

    return items;
  }, [sortBy, filterInStock, selectedMachineFilter]);

  const handlePreorder = (item: MenuItem) => {
    setSelectedItem(item);
    setPreorderDialogOpen(true);
  };

  const completePreorder = () => {
    if (!selectedMachineForPreorder || !selectedItem) {
      alert('Выберите автомат для дозаказа');
      return;
    }
    const machine = vendingMachines.find(m => m.id === selectedMachineForPreorder);
    alert(`Дозаказ оформлен!\n\nБлюдо: ${selectedItem.name}\nАвтомат: ${machine?.address}\nПолучение: завтра после 12:00`);
    setPreorderDialogOpen(false);
    setSelectedItem(null);
    setSelectedMachineForPreorder(null);
  };

  const getMachineAvailability = (item: MenuItem) => {
    const available = [];
    if (item.availability.machine1) available.push('1с6');
    if (item.availability.machine2) available.push('1с7');
    if (item.availability.machine3) available.push('1с8');
    return available;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-3xl">🥧</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Пироговский дворик</h1>
                <p className="text-xs text-muted-foreground">быстро, качественно, экологично</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              {['home', 'menu', 'machines', 'faq'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'menu' && 'Меню'}
                  {section === 'machines' && 'Автоматы'}
                  {section === 'faq' && 'FAQ'}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main>
        {activeSection === 'home' && (
          <section className="py-20 px-4">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
                <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Пироговский дворик
                </h2>
                <p className="text-2xl text-primary font-semibold">
                  быстро, качественно, экологично
                </p>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Домашняя еда в удобных автоматах на Островитянова. Свежие блюда каждый день!
                </p>
                <div className="flex gap-4 justify-center pt-4">
                  <Button size="lg" onClick={() => setActiveSection('menu')} className="text-lg">
                    Смотреть меню
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setActiveSection('machines')} className="text-lg">
                    Наши автоматы
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-20">
                {[
                  { icon: 'Leaf', title: 'Экологично', desc: 'Натуральные продукты' },
                  { icon: 'Clock', title: 'Быстро', desc: 'Готовая еда 24/7' },
                  { icon: 'Award', title: 'Качественно', desc: 'Готовим как дома' }
                ].map((feature, index) => (
                  <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-lg">
                    <CardContent className="pt-8 pb-8 text-center space-y-4">
                      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                        <Icon name={feature.icon as any} size={32} className="text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'menu' && (
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-8">Наше меню</h2>
              
              <div className="max-w-4xl mx-auto mb-8 space-y-4">
                <div className="flex flex-wrap gap-4 items-center justify-between bg-card p-4 rounded-lg border">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="sort" className="text-sm font-medium">Сортировка:</Label>
                      <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                        <SelectTrigger id="sort" className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                          <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                          <SelectItem value="calories-asc">Калории: по возрастанию</SelectItem>
                          <SelectItem value="calories-desc">Калории: по убыванию</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2">
                      <Label htmlFor="machine" className="text-sm font-medium">Автомат:</Label>
                      <Select 
                        value={selectedMachineFilter?.toString() || 'all'} 
                        onValueChange={(value) => setSelectedMachineFilter(value === 'all' ? null : Number(value))}
                      >
                        <SelectTrigger id="machine" className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все автоматы</SelectItem>
                          <SelectItem value="1">1с6 (3 этаж)</SelectItem>
                          <SelectItem value="2">1с7 (2 этаж)</SelectItem>
                          <SelectItem value="3">1с8 (-2 этаж)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="in-stock" 
                      checked={filterInStock}
                      onCheckedChange={(checked) => setFilterInStock(checked as boolean)}
                    />
                    <Label htmlFor="in-stock" className="text-sm font-medium cursor-pointer">
                      Только в наличии
                    </Label>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedItems.map((item) => {
                  const availableMachines = getMachineAvailability(item);
                  const isInStock = availableMachines.length > 0;

                  return (
                    <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all group">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 right-4 bg-white/90 text-foreground">
                          <Icon name="Flame" size={14} className="mr-1" />
                          {item.calories} ккал
                        </Badge>
                        {!isInStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge variant="destructive" className="text-lg">Нет в наличии</Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                          <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                          {isInStock && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Icon name="MapPin" size={14} />
                              <span>В наличии: {availableMachines.join(', ')}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-2xl font-bold text-primary">{item.price} ₽</span>
                          <Button onClick={() => handlePreorder(item)} variant={isInStock ? "default" : "outline"}>
                            <Icon name="Plus" size={18} className="mr-1" />
                            {isInStock ? 'Купить' : 'Дозаказ'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'machines' && (
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-4xl font-bold text-center mb-12">Наши автоматы</h2>
              <div className="space-y-4">
                {vendingMachines.map((machine) => (
                  <Card key={machine.id} className="hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Icon name="MapPin" size={20} className="text-primary" />
                            <h3 className="text-xl font-semibold">{machine.address}</h3>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground ml-7">
                            <span>{machine.floor}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground ml-7">
                            <Icon name="Clock" size={18} />
                            <span>{machine.hours}</span>
                          </div>
                        </div>
                        <Button variant="outline">
                          <Icon name="Navigation" size={18} className="mr-2" />
                          Маршрут
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'faq' && (
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-3xl">
              <h2 className="text-4xl font-bold text-center mb-12">Частые вопросы</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}
      </main>

      <Dialog open={preorderDialogOpen} onOpenChange={setPreorderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Дозаказ блюда</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-24 h-24 object-cover rounded" />
                <div>
                  <h3 className="font-semibold text-lg">{selectedItem.name}</h3>
                  <p className="text-muted-foreground text-sm">{selectedItem.description}</p>
                  <p className="font-bold text-primary mt-2">{selectedItem.price} ₽</p>
                </div>
              </div>
              
              <div>
                <Label className="mb-2 block">Выберите автомат для получения:</Label>
                <Select onValueChange={(value) => setSelectedMachineForPreorder(Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите автомат" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendingMachines.map((machine) => (
                      <SelectItem key={machine.id} value={machine.id.toString()}>
                        {machine.address} ({machine.floor})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-accent/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <Icon name="Info" size={16} className="inline mr-1" />
                  Блюдо будет доступно в выбранном автомате завтра после 12:00
                </p>
              </div>

              <Button onClick={completePreorder} className="w-full">
                Оформить дозаказ
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <footer className="bg-muted py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-semibold text-lg mb-4">Пироговский дворик</h3>
              <p className="text-muted-foreground text-sm">быстро, качественно, экологично</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Контакты</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Email: info@pirogovskiy.ru</p>
                <p>Тел: +7 (495) 123-45-67</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Режим работы</h3>
              <p className="text-sm text-muted-foreground">Автоматы работают круглосуточно</p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 Пироговский дворик. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;