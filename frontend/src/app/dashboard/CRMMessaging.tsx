import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, HomeIcon, MessageCircleIcon, PaperclipIcon, PhoneIcon, SendIcon, UserIcon } from "lucide-react"

interface Contact {
    id: string
    name: string
    lastMessage: string
    avatar: string
}

interface Message {
    id: string
    senderId: string
    content: string
    timestamp: string 
}

export default function Component() {
    const [contacts, setContacts] = useState<Contact[]>([
        {id: '1', name: 'Sukjin Lim', lastMessage: 'Interested in 90 Bukchon-ro', avatar: '/placeholder.svg?height=32&width=32'},
        {id: '2', name: 'Jungyoon Lim', lastMessage: 'Viewing scheduled for Monday', avatar: '/placeholder.svg?height=32&width=32'},
        {id: '3', name: 'Suemin Cho', lastMessage: 'Offer Accepted!', avatar: '/placeholder.svg?height=32&width=32'}
    ])

    const [messages, setMessages] = useState<Message[]>([
        { id: '1', senderId: 'agent', content: "Hello John! How can I assist you with your property search today?", timestamp: "10:00 AM" },
        { id: '2', senderId: 'client', content: "Hi Sarah, I'm very interested in the property at 123 Main St. Could we schedule a viewing?", timestamp: "10:05 AM" },
        { id: '3', senderId: 'agent', content: "I'd be happy to arrange that for you. How does this Saturday at 2 PM sound?", timestamp: "10:07 AM" },
        { id: '4', senderId: 'client', content: "Saturday at 2 PM works perfectly for me. Thank you!", timestamp: "10:10 AM" },
        { id: '5', senderId: 'agent', content: "Great! I've scheduled the viewing for Saturday at 2 PM. Is there anything specific you'd like to know about the property before we meet?", timestamp: "10:12 AM" },
        { id: '6', senderId: 'client', content: "Yes, could you tell me about the recent renovations and the age of the HVAC system?", timestamp: "10:15 AM" },
      ])
      const [newMessage, setNewMessage] = useState('')
      const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0])
    
      const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
          const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          setMessages([...messages, { id: String(messages.length + 1), senderId: 'agent', content: newMessage, timestamp: currentTime }])
          setNewMessage('')
        }
      }
    
      return (
        <Card className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-[300px_1fr]">
            <aside className="border-r">
              <div className="p-4 border-b">
                <Input placeholder="Search contacts..." />
              </div>
              <ScrollArea className="h-[600px]">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted ${selectedContact.id === contact.id ? 'bg-muted' : ''}`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <Avatar>
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.lastMessage}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </aside>
            <main>
              <header className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                    <AvatarFallback>{selectedContact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{selectedContact.name}</h2>
                    <p className="text-sm text-muted-foreground">Client since Jan 2023</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <PhoneIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <UserIcon className="h-4 w-4" />
                  </Button>
                </div>
              </header>
              <Tabs defaultValue="messages" className="h-[calc(600px-60px)]">
                <TabsList className="w-full justify-start px-4 border-b rounded-none">
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="properties">Properties</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="messages" className="h-full">
                  <ScrollArea className="h-[calc(100%-70px)] px-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.senderId === 'agent' ? 'justify-end' : 'justify-start'} mb-4`}>
                        <div className={`flex ${message.senderId === 'agent' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={message.senderId === 'agent' ? "/agent-avatar.jpg" : selectedContact.avatar} />
                            <AvatarFallback>{message.senderId === 'agent' ? 'SA' : selectedContact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className={`rounded-lg p-3 ${message.senderId === 'agent' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="p-4 border-t">
                    <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center space-x-2">
                      <Button type="button" size="icon" variant="ghost">
                        <PaperclipIcon className="h-4 w-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                      <Input 
                        id="message" 
                        placeholder="Type your message..." 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" size="icon">
                        <SendIcon className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                      </Button>
                    </form>
                  </div>
                </TabsContent>
                <TabsContent value="properties" className="h-full p-4">
                  <p>Properties associated with this client will be listed here.</p>
                </TabsContent>
                <TabsContent value="notes" className="h-full p-4">
                  <p>Client notes and additional information will be displayed here.</p>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </Card>
      )
    }