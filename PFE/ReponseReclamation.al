table 50114 "ReponseReclamation"
{
    DataClassification = ToBeClassified;

    fields
    {
        field(1; "No_"; Integer)
        {
            AutoIncrement = true;
        }
        field(2; "Subject"; Text[50])
        {
            NotBlank = true;
        }

        field(3; "AttachedFile"; Text[255])
        {
            NotBlank = false;
        }
        field(4; "Content"; Text[2048])
        {
            NotBlank = false;
        }
        field(5; "UserId"; Text[50])
        {
            NotBlank = false;
        }
        field(6; "ServiceSup"; Option)
        {
            OptionMembers = NULL,Remboursement,Intervention;
        }
        field(7; "ReclamationId"; Text[50])
        { }
        // field(8; "RemboursementId"; Text[50])
        // { }
        // field(9; "InterventionId"; Text[50])
        // { }
    }
    keys
    {
        key(MyKey; "No_")
        {

        }
    }
}
