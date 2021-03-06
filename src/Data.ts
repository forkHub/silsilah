namespace ha.contact {
    class Data {

        daftarContact(): IContactList[] {
            return [
                {
                    agentDisplayName: "null",
                    agentId: "",
                    channel: "Email",
                    channelInteractionId: 1000002,
                    channelInteractionType: "EmailED",
                    contactId: "1000210",
                    contactOutcomeCodeId: "null",
                    contactTypeDisplayName: "-",
                    contactTypeId: "",
                    customerDisplayName: "",
                    direction: "Inbound",
                    directionCode: "Y",
                    endTime: "null",
                    hasNoteList: false,
                    initialInteractionDate: "Sun Feb 13 12:11:01 ICT 2022",
                    isAssociatedWithCustomer: false,
                    isDeleted: false,
                    isInbound: true,
                    startTime: "Sun Feb 13 12:44:35 ICT 2022"
                },
                {
                    agentDisplayName: "null",
                    agentId: 0,
                    channel: "Email",
                    channelInteractionId: 1000000,
                    channelInteractionType: "EmailED",
                    contactId: "1000209",
                    contactOutcomeCodeId: "null",
                    contactTypeDisplayName: "-",
                    contactTypeId: "",
                    customerDisplayName: "",
                    direction: "Inbound",
                    directionCode: "Y",
                    endTime: "null",
                    hasNoteList: false,
                    initialInteractionDate: "Sun Feb 13 12:11:01 ICT 2022",
                    isAssociatedWithCustomer: false,
                    isDeleted: false,
                    isInbound: true,
                    startTime: "Sun Feb 13 12:11:35 ICT 2022"
                },
                {
                    agentDisplayName: "Christine Swan-Eglington (ccagent)",
                    agentId: "Object[FrameworkEVA.API.Objects.EvaId]",
                    channel: "Telephony",
                    channelInteractionId: 1000000,
                    channelInteractionType: "TelephoneCallED",
                    contactId: "1000206",
                    contactOutcomeCodeId: "null",
                    contactTypeDisplayName: "-",
                    contactTypeId: "",
                    customerDisplayName: "",
                    direction: "Inbound",
                    directionCode: "Y",
                    endTime: "Sun Feb 13 12:08:39 ICT 2022",
                    hasNoteList: false,
                    initialInteractionDate: "Sun Feb 13 12:07:40 ICT 2022",
                    isAssociatedWithCustomer: true,
                    isDeleted: false,
                    isInbound: true,
                    startTime: "Sun Feb 13 12:07:45 ICT 2022"
                },
                {
                    agentDisplayName: "Christine Swan-Eglington (ccagent)",
                    agentId: "Object[FrameworkEVA.API.Objects.EvaId]",
                    channel: "Offline",
                    channelInteractionId: "",
                    channelInteractionType: "OfflineInteractionED",
                    contactId: "1000205",
                    contactOutcomeCodeId: "null",
                    contactTypeDisplayName: "-",
                    contactTypeId: "",
                    customerDisplayName: "",
                    direction: "Offline",
                    directionCode: "O",
                    endTime: "Sun Feb 13 12:08:45 ICT 2022",
                    hasNoteList: false,
                    initialInteractionDate: "null",
                    isAssociatedWithCustomer: false,
                    isDeleted: false,
                    isInbound: false,
                    startTime: "Sun Feb 13 12:07:26 ICT 2022"
                },
                {
                    agentDisplayName: "Adam Bright (ccadam)",
                    agentId: "Object[FrameworkEVA.API.Objects.EvaId]",
                    channel: "Messaging Interaction",
                    channelInteractionId: 1000000,
                    channelInteractionType: "MessagingInteractionED",
                    contactId: "1000158",
                    contactOutcomeCodeId: "null",
                    contactTypeDisplayName: "Twitter (DM)",
                    contactTypeId: 4,
                    customerDisplayName: "",
                    direction: "Inbound",
                    directionCode: "Y",
                    endTime: "Sun Feb 13 11:45:11 ICT 2022",
                    hasNoteList: false,
                    initialInteractionDate: "Sun Feb 13 11:42:39 ICT 2022",
                    isAssociatedWithCustomer: false,
                    isDeleted: false,
                    isInbound: true,
                    startTime: "Sun Feb 13 11:43:18 ICT 2022"
                },
                {
                    agentDisplayName: "Adam Bright (ccadam)",
                    agentId: "Object[FrameworkEVA.API.Objects.EvaId]",
                    channel: "Offline",
                    channelInteractionId: "",
                    channelInteractionType: "OfflineInteractionED",
                    contactId: "1000062",
                    contactOutcomeCodeId: "null",
                    contactTypeDisplayName: "-",
                    contactTypeId: "",
                    customerDisplayName: "",
                    direction: "Offline",
                    directionCode: "O",
                    endTime: "Sat Feb 12 22:22:46 ICT 2022",
                    hasNoteList: true,
                    initialInteractionDate: "null",
                    isAssociatedWithCustomer: true,
                    isDeleted: false,
                    isInbound: false,
                    startTime: "Sat Feb 12 22:22:08 ICT 2022"
                },
                {
                    agentDisplayName: "Adam Bright (ccadam)",
                    agentId: "Object[FrameworkEVA.API.Objects.EvaId]",
                    channel: "Offline",
                    channelInteractionId: "",
                    channelInteractionType: "OfflineInteractionED",
                    contactId: "1000060",
                    contactOutcomeCodeId: "null",
                    contactTypeDisplayName: "-",
                    contactTypeId: "",
                    customerDisplayName: "",
                    direction: "Offline",
                    directionCode: "O",
                    endTime: "Sat Feb 12 22:18:11 ICT 2022",
                    hasNoteList: false,
                    initialInteractionDate: "null",
                    isAssociatedWithCustomer: true,
                    isDeleted: false,
                    isInbound: false,
                    startTime: "Sat Feb 12 22:17:41 ICT 2022"
                },
            ]
        }

        item(): IContactList {
            return {
                agentDisplayName: 'ccadam',
                startTime: (new Date()).toString(),
                channel: 'Offline'
            }
        }

    }

    export var data: Data = new Data();
}