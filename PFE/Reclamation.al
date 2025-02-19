table 50111 "Reclamations"
{
    DataClassification = ToBeClassified;

    fields
    {
        field(1; "No_"; Integer)
        {
            AutoIncrement = true;
        }
        field(2; "TargetType"; Text[50])
        {
            NotBlank = true;
        }
        field(3; "Name"; Text[100])
        {
            NotBlank = true;
        }
        field(4; "Subject"; Text[255])
        {
            NotBlank = true;
        }
        field(5; "ComplaintType"; Option)
        {
            OptionMembers = textual,voice;
            NotBlank = true;
        }
        field(6; "AttachedFile"; Text[255])
        {
            NotBlank = false;
        }
        field(7; "Content"; Text[2048])
        {
            NotBlank = false;
        }
        field(8; "VoiceNote"; Text[255])
        {
            NotBlank = false;
        }
        field(9; "Status"; Option)
        {
            OptionMembers = in_progress,resolved;
            OptionCaption = 'In Progress,Resolved';
            InitValue = in_progress;
        }
        field(10; "UserId"; Text[50])
        {
            NotBlank = false;
        }
    }
  
}
