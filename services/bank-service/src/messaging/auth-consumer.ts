import { AUTH_EVENT_EXCHANGE, AUTH_USER_REGISTERED_ROUTING_KEY, type AuthRegisteredEvent } from "@common/src";
import { connect, type Channel, type ChannelModel, type Connection, type ConsumeMessage, Replies} from "amqplib";

import { env } from "@/config/env";
import { logger } from "@/utils/logger";
import { bank }
