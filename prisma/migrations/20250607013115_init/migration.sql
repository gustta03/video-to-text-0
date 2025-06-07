-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_id" TEXT NOT NULL,
    "technician" TEXT NOT NULL,
    "project" TEXT NOT NULL,
    "connectors_used" TEXT NOT NULL,
    "ont_model" TEXT NOT NULL,
    "signal_at_oto" DOUBLE PRECISION,
    "signal_at_residence" DOUBLE PRECISION,
    "drop_length" TEXT NOT NULL,
    "connector_identified" BOOLEAN NOT NULL,
    "service_id" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_login" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opes" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "authorization_command" TEXT NOT NULL,
    "provisioning_command" TEXT NOT NULL,
    "deprovisioning_command" TEXT NOT NULL,
    "disauthorization_command" TEXT NOT NULL,

    CONSTRAINT "opes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cto_ports" (
    "id" TEXT NOT NULL,
    "cto_id" TEXT NOT NULL,
    "port_number" INTEGER NOT NULL,

    CONSTRAINT "cto_ports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ctos" (
    "id" TEXT NOT NULL,
    "cto_name" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "splitter_type" TEXT NOT NULL,
    "total_ports" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "ctos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "olts" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "connection_status" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "olts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cto_ports" ADD CONSTRAINT "cto_ports_cto_id_fkey" FOREIGN KEY ("cto_id") REFERENCES "ctos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ctos" ADD CONSTRAINT "ctos_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "olts" ADD CONSTRAINT "olts_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
