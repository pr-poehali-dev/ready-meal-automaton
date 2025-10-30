import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  calories: number;
  image: string;
  category: string;
}

interface VendingMachine {
  id: number;
  address: string;
  hours: string;
  lat: number;
  lng: number;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Паста с томатным соусом',
    description: 'Домашняя паста с томатным соусом и свежим базиликом',
    price: 350,
    calories: 450,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/5023e006-4507-44e5-8b90-0d1f8cf63120.jpg',
    category: 'Основные блюда'
  },
  {
    id: 2,
    name: 'Терияки с курицей',
    description: 'Японский терияки с куриным филе и овощами',
    price: 400,
    calories: 520,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/27b231dc-85e9-434c-a451-9fed62f6e8ab.jpg',
    category: 'Основные блюда'
  },
  {
    id: 3,
    name: 'Салат с киноа',
    description: 'Полезный салат с киноа, свежими овощами и авокадо',
    price: 320,
    calories: 280,
    image: 'https://cdn.poehali.dev/projects/c4a38814-a77b-4f47-9787-52149997cd6f/files/2e8f7211-72d2-49db-82f5-71eeb43bdd93.jpg',
    category: 'Салаты'
  }
];

const vendingMachines: VendingMachine[] = [
  { id: 1, address: 'ул. Ленина, 45', hours: '24/7', lat: 55.751244, lng: 37.618423 },
  { id: 2, address: 'пр. Мира, 120', hours: '06:00-23:00', lat: 55.769217, lng: 37.639301 },
  { id: 3, address: 'ул. Тверская, 15', hours: '24/7', lat: 55.764343, lng: 37.605011 }
];

const faqItems = [
  {
    question: 'Как заказать еду из автомата?',
    answer: 'Выберите блюдо на нашем сайте, укажите ближайший автомат и оплатите онлайн. Получите код для открытия ячейки с вашим заказом.'
  },
  {
    question: 'Еда свежая?',
    answer: 'Да! Мы готовим все блюда ежедневно на домашней кухне. Блюда хранятся при правильной температуре не более 24 часов.'
  },
  {
    question: 'Можно ли разогреть еду?',
    answer: 'В некоторых автоматах есть встроенная микроволновка. Также все блюда вкусны и в холодном виде.'
  },
  {
    question: 'Какие способы оплаты?',
    answer: 'Принимаем карты (Visa, Mastercard, МИР), Apple Pay, Google Pay, СБП. Оплата производится онлайн на сайте.'
  }
];

function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedMachine, setSelectedMachine] = useState<number | null>(null);
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart([...cart, item]);
    setOrderDialogOpen(true);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const completeOrder = () => {
    if (!selectedMachine) {
      alert('Выберите автомат для получения заказа');
      return;
    }
    alert(`Заказ оформлен! Получите его в автомате: ${vendingMachines.find(m => m.id === selectedMachine)?.address}\nКод для получения: ${Math.floor(1000 + Math.random() * 9000)}`);
    setCart([]);
    setOrderDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-2xl">🍱</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">ДомоЕда</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              {['home', 'menu', 'machines', 'faq', 'payment'].map((section) => (
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
                  {section === 'payment' && 'Оплата'}
                </button>
              ))}
            </nav>
            <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
              <DialogTrigger asChild>
                <Button className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ваш заказ</DialogTitle>
                </DialogHeader>
                {cart.length === 0 ? (
                  <p className="text-muted-foreground py-8 text-center">Корзина пуста</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{item.name}</span>
                        <span className="font-semibold">{item.price} ₽</span>
                      </div>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-lg">Итого:</span>
                        <span className="font-bold text-lg text-primary">{getTotalPrice()} ₽</span>
                      </div>
                      <Select onValueChange={(value) => setSelectedMachine(Number(value))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите автомат" />
                        </SelectTrigger>
                        <SelectContent>
                          {vendingMachines.map((machine) => (
                            <SelectItem key={machine.id} value={machine.id.toString()}>
                              {machine.address}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={completeOrder} className="w-full mt-4">
                        Оформить заказ
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main>
        {activeSection === 'home' && (
          <section className="py-20 px-4">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
                <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Домашняя еда<br />из умного автомата
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Свежие блюда, приготовленные с любовью на домашней кухне. Получите любимую еду в удобном автомате 24/7.
                </p>
                <div className="flex gap-4 justify-center pt-4">
                  <Button size="lg" onClick={() => setActiveSection('menu')} className="text-lg">
                    Смотреть меню
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setActiveSection('machines')} className="text-lg">
                    Найти автомат
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-20">
                {[
                  { icon: 'Chef', title: 'Домашняя кухня', desc: 'Готовим как дома, с любовью' },
                  { icon: 'Clock', title: '24/7 доступ', desc: 'Еда в любое время суток' },
                  { icon: 'Sparkles', title: 'Всегда свежее', desc: 'Новые блюда каждый день' }
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
              <h2 className="text-4xl font-bold text-center mb-12">Наше меню</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menuItems.map((item) => (
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
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-2xl font-bold text-primary">{item.price} ₽</span>
                        <Button onClick={() => addToCart(item)}>
                          <Icon name="Plus" size={18} className="mr-1" />
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                          <div className="flex items-center gap-2 text-muted-foreground">
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

        {activeSection === 'payment' && (
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-4xl font-bold text-center mb-12">Способы оплаты</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { icon: 'CreditCard', title: 'Банковские карты', desc: 'Visa, Mastercard, МИР' },
                  { icon: 'Smartphone', title: 'Apple Pay / Google Pay', desc: 'Быстрая оплата со смартфона' },
                  { icon: 'Wallet', title: 'СБП', desc: 'Система быстрых платежей' },
                  { icon: 'Shield', title: 'Безопасность', desc: 'Защищенные платежи SSL' }
                ].map((method, index) => (
                  <Card key={index}>
                    <CardContent className="p-8 flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name={method.icon as any} size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                        <p className="text-muted-foreground">{method.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-muted py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-semibold text-lg mb-4">ДомоЕда</h3>
              <p className="text-muted-foreground text-sm">Домашняя еда из умного автомата</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Контакты</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Email: info@domofood.ru</p>
                <p>Тел: +7 (495) 123-45-67</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Режим работы</h3>
              <p className="text-sm text-muted-foreground">Автоматы работают круглосуточно</p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 ДомоЕда. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;