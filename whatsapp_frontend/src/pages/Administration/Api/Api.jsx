import React, { useState } from "react";
import { Container, Row, Accordion, Card, Button, Table } from "react-bootstrap";
import { FaPlug } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import "./Api.css";


const apiData = {
    // BILLING
    billing: [
        {
            method: "GET",
            path: "/billing/",
            description: "billing_list",
            responseModel: [
                { field: "id", type: "integer" },
                { field: "address", type: "string" },
                { field: "city", type: "string" },
                { field: "country", type: "string" },
                { field: "tax_number", type: "string" },
                { field: "last_payment_amount", type: "string($decimal)" },
                { field: "last_payment_date", type: "string($date)" },
                { field: "user", type: "integer" },
            ],
        },
        {
            method: "POST",
            path: "/billing/",
            description: "billing_create",
            requestModel: [
                { field: "address", type: "string" },
                { field: "city", type: "string" },
                { field: "country", type: "string" },
                { field: "tax_number", type: "string" },
                { field: "last_payment_amount", type: "string($decimal)" },
                { field: "last_payment_date", type: "string($date)" },
                { field: "user", type: "integer" }
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "address", type: "string" },
                { field: "city", type: "string" },
                { field: "country", type: "string" },
                { field: "tax_number", type: "string" },
                { field: "last_payment_amount", type: "decimal" },
                { field: "last_payment_date", type: "date" },
                { field: "user", type: "integer" },
            ],
        },
        {
            method: "GET",
            path: "/billing/{id}/",
            description: "billing_read",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "address", type: "string" },
                { field: "city", type: "string" },
                { field: "country", type: "string" },
                { field: "tax_number", type: "string" },
                { field: "last_payment_amount", type: "decimal" },
                { field: "last_payment_date", type: "date" },
                { field: "user", type: "integer" },
            ],
        },
        {
            method: "PUT",
            path: "/billing/{id}/",
            description: "billing_update",
            requestModel: [
                { field: "address", type: "string" },
                { field: "city", type: "string" },
                { field: "country", type: "string" },
                { field: "tax_number", type: "string" },
                { field: "last_payment_amount", type: "string($decimal)" },
                { field: "last_payment_date", type: "string($date)" },
                { field: "user", type: "integer" },
                { field: "id", type: "integer" },
            ],

            responseModel: [
                { field: "id", type: "integer" },
                { field: "address", type: "string" },
                { field: "city", type: "string" },
                { field: "country", type: "string" },
                { field: "tax_number", type: "string" },
                { field: "last_payment_amount", type: "decimal" },
                { field: "last_payment_date", type: "date" },
                { field: "user", type: "integer" },
            ],
        },
        {
            method: "PATCH",
            path: "/billing/{id}/",
            description: "billing_partial_update",
            requestModel: [
                { field: "address", type: "string" },
                { field: "city", type: "string" },
                { field: "country", type: "string" },
                { field: "tax_number", type: "string" },
                { field: "last_payment_amount", type: "string($decimal)" },
                { field: "last_payment_date", type: "string($date)" },
                { field: "user", type: "integer" },
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "address", type: "string" },
                { field: "city", type: "string" },
                { field: "country", type: "string" },
                { field: "tax_number", type: "string" },
                { field: "last_payment_amount", type: "decimal" },
                { field: "last_payment_date", type: "date" },
                { field: "user", type: "integer" },
            ],
        },
        {
            method: "DELETE",
            path: "/billing/{id}/",
            description: "billing_delete",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "Code", type: "204" },
            ]
        },
    ],

    // CHATBOT ITEMS
    chatbot_Items: [
        {
            method: "GET",
            path: "/chatbot-items/",
            description: "chatbot-items_list",
            responseModel: [
                { field: "id", type: "integer" },
                { field: "status", type: "string (enum)" },
                { field: "default_response", type: "array[string]" },
                { field: "send_to", type: "string" },
                { field: "type", type: "string" },
                { field: "name", type: "string" },
                { field: "description", type: "string" },
                { field: "keywords", type: "string" },
                { field: "next_bot_action", type: "string" },
                { field: "presence_delay", type: "integer" },
                { field: "typing_type", type: "string (enum)" },
                { field: "use_ai", type: "boolean" },
                { field: "save_data", type: "boolean" },
                { field: "api_rst_data", type: "string" },
                { field: "chatbot", type: "integer" }
            ],
        },
        {
            method: "POST",
            path: "/chatbot-items/",
            description: "chatbot-items_create",
            requestModel: [
                { field: "status", type: "string (enum)" },
                { field: "default_response", type: "array[string]" },
                { field: "send_to", type: "string" },
                { field: "type", type: "string" },
                { field: "name", type: "string" },
                { field: "description", type: "string" },
                { field: "keywords", type: "string" },
                { field: "next_bot_action", type: "string" },
                { field: "presence_delay", type: "integer" },
                { field: "typing_type", type: "string (enum)" },
                { field: "use_ai", type: "boolean" },
                { field: "save_data", type: "boolean" },
                { field: "api_rst_data", type: "string" },
                { field: "chatbot", type: "integer" }
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "status", type: "string" },
                { field: "default_response", type: "array[string]" },
                { field: "send_to", type: "string" },
                { field: "type", type: "string" },
                { field: "name", type: "string" },
                { field: "description", type: "string" },
                { field: "keywords", type: "string" },
                { field: "next_bot_action", type: "string" },
                { field: "presence_delay", type: "integer" },
                { field: "typing_type", type: "string" },
                { field: "use_ai", type: "boolean" },
                { field: "save_data", type: "boolean" },
                { field: "api_rst_data", type: "string" },
                { field: "chatbot", type: "integer" }
            ]
        },
        {
            method: "GET",
            path: "/chatbot-items/{id}/",
            description: "chatbot-items_read",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "status", type: "string" },
                { field: "default_response", type: "array[string]" },
                { field: "send_to", type: "string" },
                { field: "type", type: "string" },
                { field: "name", type: "string" },
                { field: "description", type: "string" },
                { field: "keywords", type: "string" },
                { field: "next_bot_action", type: "string" },
                { field: "presence_delay", type: "integer" },
                { field: "typing_type", type: "string" },
                { field: "use_ai", type: "boolean" },
                { field: "save_data", type: "boolean" },
                { field: "api_rst_data", type: "string" },
                { field: "chatbot", type: "integer" }
            ]
        },
        {
            method: "PUT",
            path: "/chatbot-items/{id}/",
            description: "chatbot-items_update",
            requestModel: [
                { field: "default_response", type: "array[string]" },
                { field: "send_to", type: "string" },
                { field: "type", type: "string" },
                { field: "name", type: "string" },
                { field: "description", type: "string" },
                { field: "keywords", type: "string" },
                { field: "next_bot_action", type: "string" },
                { field: "presence_delay", type: "integer" },
                { field: "typing_type", type: "string" },
                { field: "use_ai", type: "boolean" },
                { field: "save_data", type: "boolean" },
                { field: "api_rst_data", type: "string" },
                { field: "chatbot", type: "integer" },
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "default_response", type: "array[string]" },
                { field: "send_to", type: "string" },
                { field: "type", type: "string" },
                { field: "name", type: "string" },
                { field: "description", type: "string" },
                { field: "keywords", type: "string" },
                { field: "next_bot_action", type: "string" },
                { field: "presence_delay", type: "integer" },
                { field: "typing_type", type: "string" },
                { field: "use_ai", type: "boolean" },
                { field: "save_data", type: "boolean" },
                { field: "api_rst_data", type: "string" },
                { field: "chatbot", type: "integer" }
            ]
        },
        {
            method: "PATCH",
            path: "/chatbot-items/{id}/",
            description: "chatbot-items_partial_update",
            requestModel: [
                { field: "default_response", type: "array[string]" },
                { field: "send_to", type: "string" },
                { field: "type", type: "string" },
                { field: "name", type: "string" },
                { field: "description", type: "string" },
                { field: "keywords", type: "string" },
                { field: "next_bot_action", type: "string" },
                { field: "presence_delay", type: "integer" },
                { field: "typing_type", type: "string" },
                { field: "use_ai", type: "boolean" },
                { field: "save_data", type: "boolean" },
                { field: "api_rst_data", type: "string" },
                { field: "chatbot", type: "integer" },
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "default_response", type: "array[string]" },
                { field: "send_to", type: "string" },
                { field: "type", type: "string" },
                { field: "name", type: "string" },
                { field: "description", type: "string" },
                { field: "keywords", type: "string" },
                { field: "next_bot_action", type: "string" },
                { field: "presence_delay", type: "integer" },
                { field: "typing_type", type: "string" },
                { field: "use_ai", type: "boolean" },
                { field: "save_data", type: "boolean" },
                { field: "api_rst_data", type: "string" },
                { field: "chatbot", type: "integer" }
            ]
        },
        {
            method: "DELETE",
            path: "/chatbot-items/{id}/",
            description: "chatbot-items_delete",
            requestModel: [
                { field: "id", type: "integer" }
            ],
            responseModel: [
                { field: "Code", type: "204" }
            ]
        }
    ],

    //CHATBOTS SETTINGS
    chatbot_Settings: [
        {
            method: "GET",
            path: "/chatbot-settings/",
            description: "chatbot-settings_list",
            responseModel: [
                { field: "id", type: "integer" },
                { field: "ai_status", type: "boolean" },
                { field: "ai_apikey", type: "string" },
                { field: "ai_temperature", type: "number" },
                { field: "ai_model", type: "string" },
                { field: "max_tokens", type: "integer" },
                { field: "keyword_enable", type: "boolean" },
                { field: "keyword_disable", type: "boolean" },
                { field: "chatbot", type: "integer" },
            ]
        },
        {
            method: "POST",
            path: "/chatbot-settings/",
            description: "chatbot-settings_create",
            requestModel: [
                { field: "ai_status", type: "boolean" },
                { field: "ai_apikey", type: "string" },
                { field: "ai_temperature", type: "number" },
                { field: "ai_model", type: "string" },
                { field: "max_tokens", type: "integer" },
                { field: "keyword_enable", type: "boolean" },
                { field: "keyword_disable", type: "boolean" },
                { field: "chatbot", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "ai_status", type: "boolean" },
                { field: "ai_apikey", type: "string" },
                { field: "ai_temperature", type: "number" },
                { field: "ai_model", type: "string" },
                { field: "max_tokens", type: "integer" },
                { field: "keyword_enable", type: "boolean" },
                { field: "keyword_disable", type: "boolean" },
                { field: "chatbot", type: "integer" },
            ]
        },
        {
            method: "GET",
            path: "/chatbot-settings/{id}/",
            description: "chatbot-settings_read",
            requestModel: [
                { field: "id", type: "integer" }
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "ai_status", type: "boolean" },
                { field: "ai_apikey", type: "string" },
                { field: "ai_temperature", type: "number" },
                { field: "ai_model", type: "string" },
                { field: "max_tokens", type: "integer" },
                { field: "keyword_enable", type: "boolean" },
                { field: "keyword_disable", type: "boolean" },
                { field: "chatbot", type: "integer" }
            ]
        },
        {
            method: "PUT",
            path: "/chatbot-settings/{id}/",
            description: "chatbot-settings_update",
            requestModel: [
                { field: "ai_status", type: "boolean" },
                { field: "ai_apikey", type: "string" },
                { field: "ai_temperature", type: "number" },
                { field: "ai_model", type: "string" },
                { field: "max_tokens", type: "integer" },
                { field: "keyword_enable", type: "boolean" },
                { field: "keyword_disable", type: "boolean" },
                { field: "chatbot", type: "integer" },
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "ai_status", type: "boolean" },
                { field: "ai_apikey", type: "string" },
                { field: "ai_temperature", type: "number" },
                { field: "ai_model", type: "string" },
                { field: "max_tokens", type: "integer" },
                { field: "keyword_enable", type: "boolean" },
                { field: "keyword_disable", type: "boolean" },
                { field: "chatbot", type: "integer" },
            ]
        },
        {
            method: "PATCH",
            path: "/chatbot-settings/{id}/",
            description: "chatbot-settings_partial_update",
            requestModel: [
                { field: "ai_status", type: "boolean" },
                { field: "ai_apikey", type: "string" },
                { field: "ai_temperature", type: "number" },
                { field: "ai_model", type: "string" },
                { field: "max_tokens", type: "integer" },
                { field: "keyword_enable", type: "boolean" },
                { field: "keyword_disable", type: "boolean" },
                { field: "chatbot", type: "integer" },
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "ai_status", type: "boolean" },
                { field: "ai_apikey", type: "string" },
                { field: "ai_temperature", type: "number" },
                { field: "ai_model", type: "string" },
                { field: "max_tokens", type: "integer" },
                { field: "keyword_enable", type: "boolean" },
                { field: "keyword_disable", type: "boolean" },
                { field: "chatbot", type: "integer" },
            ]
        },
        {
            method: "DELETE",
            path: "/chatbot-settings/{id}/",
            description: "chatbot-settings_delete",
            requestModel: [
                { field: "id", type: "integer" }
            ],
            responseModel: [
                { field: "Code", type: "204" }
            ]
        }
    ],

    // CHATBOTS
    chatbots: [
        {
            method: "GET",
            path: "/chatbots/",
            description: "chatbots_list",
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
                { field: "status", type: "string" },
                {
                    field: "whatsapp",
                    type: "object[]",
                    children: [
                        { field: "id", type: "integer" },
                        { field: "name", type: "string" },
                        { field: "phone_number", type: "string" },
                        { field: "status", type: "string" },
                        { field: "user", type: "integer" },
                    ],
                },
                { field: "whatsapp_id", type: "integer" },
            ],
        },
        {
            method: "POST",
            path: "/chatbots/",
            description: "chatbots_create",
            requestModel: [
                { field: "name", type: "string" },
                { field: "status", type: "string" },
                {
                    field: "whatsapp",
                    type: "object[]",
                    children: [
                        { field: "name", type: "string" },
                        { field: "phone_number", type: "string" },
                        { field: "status", type: "string" },
                        { field: "user", type: "integer" },
                    ],
                },
                { field: "whatsapp_id", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
                { field: "status", type: "string" },
                {
                    field: "whatsapp",
                    type: "object[]",
                    children: [
                        { field: "id", type: "integer" },
                        { field: "name", type: "string" },
                        { field: "phone_number", type: "string" },
                        { field: "status", type: "string" },
                        { field: "user", type: "integer" },
                    ],
                },
                { field: "whatsapp_id", type: "integer" },
            ],
        },
        {
            method: "GET",
            path: "/chatbots/{id}/",
            description: "chatbots_read",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
                { field: "status", type: "string" },
                {
                    field: "whatsapp",
                    type: "object[]",
                    children: [
                        { field: "id", type: "integer" },
                        { field: "name", type: "string" },
                        { field: "phone_number", type: "string" },
                        { field: "status", type: "string" },
                        { field: "user", type: "integer" },
                    ],
                },
                { field: "whatsapp_id", type: "integer" },
            ],
        },
        {
            method: "PUT",
            path: "/chatbots/{id}/",
            description: "chatbots_update",
            requestModel: [
                { field: "name", type: "string" },
                { field: "status", type: "string" },
                {
                    field: "whatsapp",
                    type: "object[]",
                    children: [
                        { field: "name", type: "string" },
                        { field: "phone_number", type: "string" },
                        { field: "status", type: "string" },
                        { field: "user", type: "integer" },
                    ],
                },
                { field: "whatsapp_id", type: "integer" },
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
                { field: "status", type: "string" },
                {
                    field: "whatsapp",
                    type: "object[]",
                    children: [
                        { field: "id", type: "integer" },
                        { field: "name", type: "string" },
                        { field: "phone_number", type: "string" },
                        { field: "status", type: "string" },
                        { field: "user", type: "integer" },
                    ],
                },
                { field: "whatsapp_id", type: "integer" },
            ],
        },
        {
            method: "PATCH",
            path: "/chatbots/{id}/",
            description: "chatbots_partial_update",
            requestModel: [
                { field: "name", type: "string" },
                { field: "status", type: "string" },
                {
                    field: "whatsapp",
                    type: "object[]",
                    children: [
                        { field: "name", type: "string" },
                        { field: "phone_number", type: "string" },
                        { field: "status", type: "string" },
                        { field: "user", type: "integer" },
                    ],
                },
                { field: "whatsapp_id", type: "integer" },
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
                { field: "status", type: "string" },
                {
                    field: "whatsapp",
                    type: "object[]",
                    children: [
                        { field: "id", type: "integer" },
                        { field: "name", type: "string" },
                        { field: "phone_number", type: "string" },
                        { field: "status", type: "string" },
                        { field: "user", type: "integer" },
                    ],
                },
                { field: "whatsapp_id", type: "integer" },
            ],
        },
        {
            method: "DELETE",
            path: "/chatbots/{id}/",
            description: "chatbots_delete",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "Code", type: "204" },
            ],
        },
    ],

    // INSTANCES
    instances: [
        {
            method: "GET",
            path: "/instances/",
            description: "instances_list",
            responseModel: [
                { field: "id", type: "integer" },
                { field: "instance_key", type: "string" },
                { field: "session_data", type: "string" },
                { field: "created_at", type: "string($date-time)" },
                { field: "whatsapp", type: "integer" },
            ],
        },
        {
            method: "POST",
            path: "/instances/",
            description: "instances_create",
            requestModel: [
                { field: "instance_key", type: "string" },
                { field: "session_data", type: "string" },
                { field: "whatsapp", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "instance_key", type: "string" },
                { field: "session_data", type: "string" },
                { field: "created_at", type: "string($date-time)" },
                { field: "whatsapp", type: "integer" },
            ],
        },
        {
            method: "GET",
            path: "/instances/{id}/",
            description: "instances_read",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "instance_key", type: "string" },
                { field: "session_data", type: "string" },
                { field: "created_at", type: "string($date-time)" },
                { field: "whatsapp", type: "integer" },
            ],
        },
        {
            method: "PUT",
            path: "/instances/{id}/",
            description: "instances_update",
            requestModel: [
                { field: "id", type: "integer" },
                { field: "instance_key", type: "string" },
                { field: "session_data", type: "string" },
                { field: "whatsapp", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "instance_key", type: "string" },
                { field: "session_data", type: "string" },
                { field: "created_at", type: "string($date-time)" },
                { field: "whatsapp", type: "integer" },
            ],
        },
        {
            method: "PATCH",
            path: "/instances/{id}/",
            description: "instances_partial_update",
            requestModel: [
                { field: "id", type: "integer" },
                { field: "instance_key", type: "string" },
                { field: "session_data", type: "string" },
                { field: "whatsapp", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "instance_key", type: "string" },
                { field: "session_data", type: "string" },
                { field: "created_at", type: "string($date-time)" },
                { field: "whatsapp", type: "integer" },
            ],
        },
        {
            method: "DELETE",
            path: "/instances/{id}/",
            description: "instances_delete",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "Code", type: "204" },
            ],
        },
    ],

    //MESSAGES
    messages: [
        {
            method: "GET",
            path: "/messages/",
            description: "messages_list",
            responseModel: [
                { field: "id", type: "integer" },
                { field: "sender", type: "string" },
                { field: "receiver", type: "string" },
                { field: "message", type: "string" },
                { field: "message_type", type: "string" },
                { field: "created_at", type: "string($date-time)" },
                { field: "status", type: "string" },
                { field: "whatsapp", type: "integer" },
                { field: "instance", type: "integer" },
                { field: "chatbot", type: "integer" },
            ],
        },
        {
            method: "POST",
            path: "/messages/",
            description: "messages_create",
            requestModel: [
                { field: "sender", type: "string" },
                { field: "receiver", type: "string" },
                { field: "message", type: "string" },
                { field: "message_type", type: "string" },
                { field: "status", type: "string" },
                { field: "whatsapp", type: "integer" },
                { field: "instance", type: "integer" },
                { field: "chatbot", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "sender", type: "string" },
                { field: "receiver", type: "string" },
                { field: "message", type: "string" },
                { field: "message_type", type: "string" },
                { field: "created_at", type: "string($date-time)" },
                { field: "status", type: "string" },
                { field: "whatsapp", type: "integer" },
                { field: "instance", type: "integer" },
                { field: "chatbot", type: "integer" },
            ],
        },
        {
            method: "GET",
            path: "/messages/{id}/",
            description: "messages_read",
            requestModel: [
                { field: "id", type: "integer" }
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "sender", type: "string" },
                { field: "receiver", type: "string" },
                { field: "message", type: "string" },
                { field: "message_type", type: "string" },
                { field: "created_at", type: "string($date-time)" },
                { field: "status", type: "string" },
                { field: "whatsapp", type: "integer" },
                { field: "instance", type: "integer" },
                { field: "chatbot", type: "integer" },
            ],
        },
        {
            method: "PUT",
            path: "/messages/{id}/",
            description: "messages_update",
            requestModel: [
                { field: "id", type: "integer" },
                { field: "sender", type: "string" },
                { field: "receiver", type: "string" },
                { field: "message", type: "string" },
                { field: "message_type", type: "string" },
                { field: "status", type: "string" },
                { field: "whatsapp", type: "integer" },
                { field: "instance", type: "integer" },
                { field: "chatbot", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "sender", type: "string" },
                { field: "receiver", type: "string" },
                { field: "message", type: "string" },
                { field: "message_type", type: "string" },
                { field: "created_at", type: "string($date-time)" },
                { field: "status", type: "string" },
                { field: "whatsapp", type: "integer" },
                { field: "instance", type: "integer" },
                { field: "chatbot", type: "integer" },
            ],
        },
        {
            method: "PATCH",
            path: "/messages/{id}/",
            description: "messages_partial_update",
            requestModel: [
                { field: "id", type: "integer" },
                { field: "sender", type: "string" },
                { field: "receiver", type: "string" },
                { field: "message", type: "string" },
                { field: "message_type", type: "string" },
                { field: "status", type: "string" },
                { field: "whatsapp", type: "integer" },
                { field: "instance", type: "integer" },
                { field: "chatbot", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "sender", type: "string" },
                { field: "receiver", type: "string" },
                { field: "message", type: "string" },
                { field: "message_type", type: "string" },
                { field: "created_at", type: "string($date-time)" },
                { field: "status", type: "string" },
                { field: "whatsapp", type: "integer" },
                { field: "instance", type: "integer" },
                { field: "chatbot", type: "integer" },
            ],
        },
        {
            method: "DELETE",
            path: "/messages/{id}/",
            description: "messages_delete",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "Code", type: "204" },
            ],
        },
    ],

    // PERMISSIONS
    permissions: [
        {
            method: "GET",
            path: "/permissions/",
            description: "permissions_list",
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
            ],
        },
        {
            method: "POST",
            path: "/permissions/",
            description: "permissions_create",
            requestModel: [
                { field: "name", type: "string" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
            ],
        },
        {
            method: "GET",
            path: "/permissions/{id}/",
            description: "permissions_read",
            requestModel: [
                { field: "id", type: "integer" }
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
            ],
        },
        {
            method: "PUT",
            path: "/permissions/{id}/",
            description: "permissions_update",
            requestModel: [
                { field: "name", type: "string" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
            ],
        },
        {
            method: "PATCH",
            path: "/permissions/{id}/",
            description: "permissions_partial_update",
            requestModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
            ],
        },
        {
            method: "DELETE",
            path: "/permissions/{id}/",
            description: "permissions_delete",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "Code", type: "204" },
            ],
        }
    ],

    // PLANS PERMISSIONS
    plan_Permissions: [
        {
            method: "GET",
            path: "/plan-permissions/",
            description: "plan-permissions_list",
            responseModel: [
                { field: "id", type: "integer" },
                { field: "plan", type: "integer" },
                {
                    field: "permission",
                    type: "object",
                    children: [
                        { field: "id", type: "integer" },
                        { field: "name", type: "string" },
                    ],
                },
                { field: "permission_id", type: "integer" },
            ],
        },
        {
            method: "POST",
            path: "/plan-permissions/",
            description: "plan-permissions_create",
            requestModel: [
                { field: "plan", type: "integer" },
                {
                    field: "permission",
                    type: "object",
                    children: [
                        { field: "name", type: "string" },
                    ],
                },
                { field: "permission_id", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "plan", type: "integer" },
                {
                    field: "permission",
                    type: "object",
                    children: [
                        { field: "id", type: "integer" },
                        { field: "name", type: "string" },
                    ],
                },
                { field: "permission_id", type: "integer" },
            ],
        },
        {
            method: "DELETE",
            path: "/plan-permissions/{id}/",
            description: "plan-permissions_delete",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "Code", type: "204" },
            ],
        },
    ],

    // PLANS
    plans: [
        {
            method: "GET",
            path: "/plans/",
            description: "plans_list",
            responseModel: [
                { field: "id", type: "integer" },
                { field: "permissions", type: "string" },
                { field: "name", type: "string" },
                { field: "whatsapp_limit", type: "integer" },
                { field: "message_limit", type: "integer" },
                { field: "automated_replies", type: "integer" },
                { field: "simultaneous_campaigns", type: "integer" },
                { field: "contact_groups", type: "integer" },
                { field: "contacts_per_group", type: "integer" },
            ],
        },
        {
            method: "POST",
            path: "/plans/",
            description: "plans_create",
            requestModel: [
                { field: "name", type: "string" },
                { field: "whatsapp_limit", type: "integer" },
                { field: "message_limit", type: "integer" },
                { field: "automated_replies", type: "integer" },
                { field: "simultaneous_campaigns", type: "integer" },
                { field: "contact_groups", type: "integer" },
                { field: "contacts_per_group", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "permissions", type: "string" },
                { field: "name", type: "string" },
                { field: "whatsapp_limit", type: "integer" },
                { field: "message_limit", type: "integer" },
                { field: "automated_replies", type: "integer" },
                { field: "simultaneous_campaigns", type: "integer" },
                { field: "contact_groups", type: "integer" },
                { field: "contacts_per_group", type: "integer" },
            ],
        },
        {
            method: "GET",
            path: "/plans/{id}/",
            description: "plans_read",
            requestModel: [
                { field: "id", type: "integer" }
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "permissions", type: "string" },
                { field: "name", type: "string" },
                { field: "whatsapp_limit", type: "integer" },
                { field: "message_limit", type: "integer" },
                { field: "automated_replies", type: "integer" },
                { field: "simultaneous_campaigns", type: "integer" },
                { field: "contact_groups", type: "integer" },
                { field: "contacts_per_group", type: "integer" },
            ],
        },
        {
            method: "PUT",
            path: "/plans/{id}/",
            description: "plans_update",
            requestModel: [
                { field: "name", type: "string" },
                { field: "whatsapp_limit", type: "integer" },
                { field: "message_limit", type: "integer" },
                { field: "automated_replies", type: "integer" },
                { field: "simultaneous_campaigns", type: "integer" },
                { field: "contact_groups", type: "integer" },
                { field: "contacts_per_group", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "permissions", type: "string" },
                { field: "name", type: "string" },
                { field: "whatsapp_limit", type: "integer" },
                { field: "message_limit", type: "integer" },
                { field: "automated_replies", type: "integer" },
                { field: "simultaneous_campaigns", type: "integer" },
                { field: "contact_groups", type: "integer" },
                { field: "contacts_per_group", type: "integer" },
            ],
        },
        {
            method: "PATCH",
            path: "/plans/{id}/",
            description: "plans_partial_update",
            requestModel: [
                { field: "name", type: "string" },
                { field: "whatsapp_limit", type: "integer" },
                { field: "message_limit", type: "integer" },
                { field: "automated_replies", type: "integer" },
                { field: "simultaneous_campaigns", type: "integer" },
                { field: "contact_groups", type: "integer" },
                { field: "contacts_per_group", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "permissions", type: "string" },
                { field: "name", type: "string" },
                { field: "whatsapp_limit", type: "integer" },
                { field: "message_limit", type: "integer" },
                { field: "automated_replies", type: "integer" },
                { field: "simultaneous_campaigns", type: "integer" },
                { field: "contact_groups", type: "integer" },
                { field: "contacts_per_group", type: "integer" },
            ],
        },
        {
            method: "DELETE",
            path: "/plans/{id}/",
            description: "plans_delete",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "Code", type: "204" },
            ],
        },
        {
            method: "GET",
            path: "/plans/{plan_id}/permissions",
            description: "plans_permissions_list",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "Code", type: "200" },
            ],
        }
    ],

    // ROLES
    roles: [
        {
            method: "GET",
            path: "/roles/",
            description: "roles_list",
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
            ],
        },
        {
            method: "POST",
            path: "/roles/",
            description: "roles_create",
            requestModel: [
                { field: "name", type: "string" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
            ],
        },
        {
            method: "GET",
            path: "/roles/{id}/",
            description: "roles_read",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
            ],
        },
        {
            method: "PUT",
            path: "/roles/{id}/",
            description: "roles_update",
            requestModel: [
                { field: "name", type: "string" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
            ],
        },
        {
            method: "PATCH",
            path: "/roles/{id}/",
            description: "roles_partial_update",
            requestModel: [
                { field: "name", type: "string" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
            ],
        },
        {
            method: "DELETE",
            path: "/roles/{id}/",
            description: "roles_delete",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "Code", type: "204" },
            ],
        }
    ],

    // TOKEN
    token: [
        {
            method: "POST",
            path: "/token/",
            description: "token_create",
            requestModel: [
                { field: "username", type: "string" },
                { field: "password", type: "string" },
            ],
            responseModel: [
                { field: "username", type: "string" },
                { field: "password", type: "string" },
            ],
        },
        {
            method: "POST",
            path: "/token/refresh/",
            description: "token_refresh_create",
            requestModel: [
                { field: "refresh", type: "string" }
            ],
            responseModel: [
                { field: "refresh", type: "string" },
                { field: "access", type: "string" },
            ]
        },
        {
            method: "POST",
            path: "/token/verify",
            description: "token_verify_create",
            requestModel: [
                { field: "token", type: "string" },
            ],
            responseModel: [
                { field: "token", type: "string" },
            ]
        }
    ],

    // USERS 
    users: [
        {
            method: "GET",
            path: "/users/",
            description: "users_list",
            responseModel: [
                { field: "id", type: "integer" },
                { field: "username", type: "string" },
                { field: "email", type: "string($email)" },
                { field: "first_name", type: "string" },
                { field: "last_name", type: "string" },
                { field: "password", type: "string" },
                { field: "role", type: "integer" },
                { field: "plan", type: "integer" },
                { field: "expire_date", type: "string($date)" },
            ],
        },
        {
            method: "POST",
            path: "/users/",
            description: "users_create",
            requestModel: [
                { field: "username", type: "string" },
                { field: "email", type: "string($email)" },
                { field: "first_name", type: "string" },
                { field: "last_name", type: "string" },
                { field: "password", type: "string" },
                { field: "role", type: "integer" },
                { field: "plan", type: "integer" },
                { field: "expire_date", type: "string($date)" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "username", type: "string" },
                { field: "email", type: "string($email)" },
                { field: "first_name", type: "string" },
                { field: "last_name", type: "string" },
                { field: "password", type: "string" },
                { field: "role", type: "integer" },
                { field: "plan", type: "integer" },
                { field: "expire_date", type: "string($date)" },
            ],
        },
        {
            method: "GET",
            path: "/users/{id}/",
            description: "users_read",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "username", type: "string" },
                { field: "email", type: "string($email)" },
                { field: "first_name", type: "string" },
                { field: "last_name", type: "string" },
                { field: "password", type: "string" },
                { field: "role", type: "integer" },
                { field: "plan", type: "integer" },
                { field: "expire_date", type: "string($date)" },
            ]
        },
        {
            method: "PUT",
            path: "/users/{id}/",
            description: "users_update",
            requestModel: [
                { field: "username", type: "string" },
                { field: "email", type: "string($email)" },
                { field: "first_name", type: "string" },
                { field: "last_name", type: "string" },
                { field: "password", type: "string" },
                { field: "role", type: "integer" },
                { field: "plan", type: "integer" },
                { field: "expire_date", type: "string($date)" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "username", type: "string" },
                { field: "email", type: "string($email)" },
                { field: "first_name", type: "string" },
                { field: "last_name", type: "string" },
                { field: "password", type: "string" },
                { field: "role", type: "integer" },
                { field: "plan", type: "integer" },
                { field: "expire_date", type: "string($date)" },
            ]
        },
        {
            method: "PATCH",
            path: "/users/{id}/",
            description: "users_partial_update",
            requestModel: [
                { field: "username", type: "string" },
                { field: "email", type: "string($email)" },
                { field: "first_name", type: "string" },
                { field: "last_name", type: "string" },
                { field: "password", type: "string" },
                { field: "role", type: "integer" },
                { field: "plan", type: "integer" },
                { field: "expire_date", type: "string($date)" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "username", type: "string" },
                { field: "email", type: "string($email)" },
                { field: "first_name", type: "string" },
                { field: "last_name", type: "string" },
                { field: "password", type: "string" },
                { field: "role", type: "integer" },
                { field: "plan", type: "integer" },
                { field: "expire_date", type: "string($date)" },
            ]
        },
        {
            method: "DELETE",
            path: "/users/{id}/",
            description: "users_delete",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "Code", type: "204" },
            ],
        }
    ],

    // WHATSAPP ACCOUNTS
    whatsapp_Accounts: [
        {
            method: "GET",
            path: "/whatsapp-accounts/",
            description: "whatsapp-acounts_list",
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
                { field: "phone_number", type: "string" },
                { field: "status", type: "string" },
                { field: "user", type: "integer" },
            ],
        },
        {
            method: "POST",
            path: "/whatsapp-accounts/",
            description: "whatsapp-acounts_create",
            requestModel: [
                { field: "name", type: "string" },
                { field: "phone_number", type: "string" },
                { field: "status", type: "string" },
                { field: "user", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
                { field: "phone_number", type: "string" },
                { field: "status", type: "string" },
                { field: "user", type: "integer" },
            ]
        },
        {
            method: "GET",
            path: "/whatsapp-accounts/{id}/",
            description: "whatsapp-accounts_read",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
                { field: "phone_number", type: "string" },
                { field: "status", type: "string" },
                { field: "user", type: "integer" },
            ]
        },
        {
            method: "PUT",
            path: "/whatsapp-accounts/{id}/",
            description: "whatsapp-accounts_update",
            requestModel: [
                { field: "name", type: "string" },
                { field: "phone_number", type: "string" },
                { field: "status", type: "string" },
                { field: "user", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
                { field: "phone_number", type: "string" },
                { field: "status", type: "string" },
                { field: "user", type: "integer" },
            ]
        },
        {
            method: "PATCH",
            path: "/whatsapp-accounts/{id}/",
            description: "whatsapp-accounts_partial_update",
            requestModel: [
                { field: "name", type: "string" },
                { field: "phone_number", type: "string" },
                { field: "status", type: "string" },
                { field: "user", type: "integer" },
            ],
            responseModel: [
                { field: "id", type: "integer" },
                { field: "name", type: "string" },
                { field: "phone_number", type: "string" },
                { field: "status", type: "string" },
                { field: "user", type: "integer" },
            ]
        },
        {

            method: "DELETE",
            path: "/whatsapp-accounts/{id}/",
            description: "whatsapp-accounts_delete",
            requestModel: [
                { field: "id", type: "integer" },
            ],
            responseModel: [
                { field: "Code", type: "204" },
            ],

        }
    ],
};

const methodColors = {
    GET: "primary",
    POST: "success",
    PUT: "warning",
    PATCH: "info",
    DELETE: "danger",
};

const Api = () => {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (sectionId) => {
        setActiveSection((prev) => (prev === sectionId ? null : sectionId));
    };

    return (
        <div className="api-page">
            <Sidebar />
            <div className="admin-menu-container">
                <AdminMenu />
            </div>
            <div className="admin-content">
                <Topbar />
                <Container fluid className="p-4">
                    <h2>
                        <FaPlug color="#FF6F00" /> API
                    </h2>

                    {Object.entries(apiData).map(([groupName, endpoints]) => (
                        <Accordion defaultActiveKey="0" className="mt-4" key={groupName}>
                            <Accordion.Item eventKey={groupName}>
                                <Accordion.Header className="bg-light">{groupName.charAt(0).toUpperCase() + groupName.slice(1)}</Accordion.Header>
                                <Accordion.Body>
                                    {endpoints.map((ep, index) => {
                                        const isActive = activeSection === `${groupName}-${index}`;
                                        return (
                                            <Card className="mb-2" key={`${groupName}-${index}`}>
                                                <Card.Header
                                                    className={`d-flex justify-content-between align-items-center bg-${methodColors[ep.method]} text-white`}
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => toggleSection(`${groupName}-${index}`)}
                                                >
                                                    <div>
                                                        <strong>{ep.method}</strong> {ep.path}
                                                    </div>
                                                    <small>{ep.description}</small>
                                                </Card.Header>
                                                {isActive && ep.responseModel && (
                                                    <Card.Body>
                                                        {ep.requestModel && (
                                                            <>
                                                                <p><strong>Request Model:</strong></p>
                                                                <Table striped bordered hover size="sm">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Field</th>
                                                                            <th>Type</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {ep.requestModel.map((field, i) => (
                                                                            <>
                                                                                <tr key={`req-${i}`}>
                                                                                    <td>{field.field}</td>
                                                                                    <td>{field.type}</td>
                                                                                </tr>
                                                                                {field.children && field.children.map((child, j) => (
                                                                                    <tr key={`req-${i}-${j}`}>
                                                                                        <td style={{ paddingLeft: "2rem" }}>↳ {child.field}</td>
                                                                                        <td>{child.type}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </>
                                                                        ))}
                                                                    </tbody>
                                                                </Table>
                                                            </>
                                                        )}

                                                        {ep.responseModel && ep.responseModel.length > 1 && (
                                                            <>
                                                                <p className="mt-3"><strong>Response Model:</strong></p>
                                                                <Table striped bordered hover size="sm">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Field</th>
                                                                            <th>Type</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {ep.responseModel.map((field, i) => (
                                                                            <>
                                                                                <tr key={`res-${i}`}>
                                                                                    <td>{field.field}</td>
                                                                                    <td>{field.type}</td>
                                                                                </tr>
                                                                                {field.children && field.children.map((child, j) => (
                                                                                    <tr key={`res-${i}-${j}`}>
                                                                                        <td style={{ paddingLeft: "2rem" }}>↳ {child.field}</td>
                                                                                        <td>{child.type}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </>
                                                                        ))}
                                                                    </tbody>
                                                                </Table>
                                                            </>
                                                        )}

                                                        {ep.responseModel && ep.responseModel.length === 1 && ep.responseModel[0].field === "Code" && (
                                                            <p className="mt-3"><strong>Expected response:</strong> Code <code>{ep.responseModel[0].type}</code> (without content)</p>
                                                        )}
                                                    </Card.Body>
                                                )}
                                            </Card>
                                        );
                                    })}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))}
                </Container>
            </div>
        </div>
    );
};

export default Api;
