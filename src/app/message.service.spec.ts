import { MessageService } from "./message.service"

describe('MessageService',()=>{

    it('should have no message at start',()=>{
        
        let messageService = new MessageService();
        expect(messageService.messages.length).toBe(0)
    })
    it('should have message when add is called',()=>{
        let messageService = new MessageService();
        let message = 'Hi';
        messageService.add(message);

        expect(messageService.messages.length).toBe(1)
    })
    it('should clear messages when clear is called',()=>{
        let messageService = new MessageService();
        messageService.add('abcd');

        messageService.clear();

        expect(messageService.messages.length).toBe(0)
    })
})